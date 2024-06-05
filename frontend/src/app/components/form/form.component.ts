import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IEmployee } from 'src/app/interfaces/employee.interface';
import { EmployeeService } from 'src/app/services/employees.service';
import { IMAGE_URL } from 'src/app/environment';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})

export class FormComponent implements OnChanges {
  IMAGE_URL = IMAGE_URL
  formData!: FormGroup
  @Input() employee !: IEmployee
  @Output() submitSuccess = new EventEmitter()
  selectedFile: File | null = null;

  constructor(private service: EmployeeService) { 
    this.defineForm()
  }
  
  defineForm() {
    this.formData = new FormGroup({
      firstName: new FormControl(this.employee?.firstName),
      lastName: new FormControl(this.employee?.lastName),
      age: new FormControl(this.employee?.age),
      salary: new FormControl(this.employee?.salary),
    })
  }

  hasError(field: string, type: string): boolean {
    return this.formData.get(field)?.hasError(type) as boolean
  }

  getErrorApi(field: string): string {
    return this.formData.get(field)?.getError('errorsApi')
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.employee) {
      this.defineForm()
    }
  }

  submit(e: any) : void {
    e.preventDefault();
    this.formData.markAllAsTouched()
    if (this.formData.valid) {
      const formData = new FormData();
        formData.append('firstName', this.formData.value?.firstName)
        formData.append('lastName', this.formData.value?.lastName)
        formData.append('age', this.formData.value?.age)
        formData.append('salary', this.formData.value?.salary)
        if (this.selectedFile) {
          formData.append('image', this.selectedFile, this.selectedFile.name);
        }
      if (this.employee) {
        this.service.update(this.employee.id, formData)
          .subscribe({
            next: () => {
              alert("Empleado actualizado exitosamente")
            },
            error: (err) => {
              err.error?.errors?.forEach((element : any) => {
                let error = Object.entries(element)[0]
                this.formData.get(error[0])?.setErrors({ 'errorsApi': error[1] })
              });
            }
          })
      } else {
        this.service.create(formData)
          .subscribe({
            next: () => {
              alert("Empleado creado exitosamente")
              this.submitSuccess.emit()
            },
            error: (err) => {
              err.error?.errors?.forEach((element : any) => {
                let error = Object.entries(element)[0]
                this.formData.get(error[0])?.setErrors({ 'errorsApi': error[1] })
              });
            }
          })
      }
    }
  }

}