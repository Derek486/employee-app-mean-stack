import { Component } from '@angular/core';
import { IEmployee } from '../interfaces/employee.interface';
import { EmployeeService } from '../services/employees.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-employees-edit',
	templateUrl: './employees-edit.page.html',
})
export class EmployeesPageEdit {
	employee!: IEmployee

	constructor(private service: EmployeeService, private router: ActivatedRoute) {
		const id = this.router.snapshot.paramMap.get('idEmployee');
		this.service.show(id!).subscribe((data: IEmployee) => {
			this.employee = data
		})
	}
}
