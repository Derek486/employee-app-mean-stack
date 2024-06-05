import { Component } from '@angular/core';
import { IEmployee } from '../interfaces/employee.interface';
import { EmployeeService } from '../services/employees.service';
import { IMAGE_URL } from '../environment';

@Component({
	selector: 'app-employees',
	templateUrl: './employees.page.html',
	styleUrls: ['./employees.page.css']
})
export class EmployeesPage {
	employees: IEmployee[] = []
	nameSearch = ""
	isReverseSort = false;
	IMAGE_URL = IMAGE_URL

	constructor(private service: EmployeeService) {
		this.loadData()
	}

	sortTable(field: keyof IEmployee) {
		this.employees.sort((a: IEmployee, b: IEmployee) => {
			const valueA = typeof a[field] === 'string' ? (a[field] as string)?.toUpperCase() : a[field];
			const valueB = typeof b[field] === 'string' ? (b[field] as string)?.toUpperCase() : b[field];
			const comparison = (valueA as any) < (valueB as any) ? -1 : (valueA as any) > (valueB as any) ? 1 : 0;
			return this.isReverseSort ? comparison * -1 : comparison;
		})
		this.isReverseSort = !this.isReverseSort
	}

	loadData(query = {}) {
		this.service.index(query).subscribe((data: IEmployee[]) => {
			this.employees = data
		})
	}

	searchUser() {
		this.loadData({
			firstName: this.nameSearch,
			lastName: this.nameSearch,
		})
	}

	popEmployeeList(id: number | string) {
		this.employees = this.employees.filter((employee: IEmployee) => employee.id !== id)
	}

	deleteEmployee(employee: IEmployee) {
		if (confirm("¿Está seguro de eliminar este empleado?")) {
			this.service.delete(employee.id)
				.subscribe({
					next: (res) => {
						alert("Empleado eliminado")
						this.popEmployeeList(employee.id)
					},
					error: (err) => {
						alert(`Ha ocurrido un error ${err}`)
					}
				})
		}
	}
}
