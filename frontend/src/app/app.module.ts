import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employees.service';
import { EmployeeLayout } from './layouts/employee.layout';
import { FormComponent } from './components/form/form.component';
import { EmployeesPage } from './pages/employees.page';
import { EmployeesPageEdit } from './pages/employees-edit.page';

@NgModule({
  declarations: [
    AppComponent,

    EmployeeLayout,
    FormComponent,

    EmployeesPage,
    EmployeesPageEdit
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // Peticiones backend
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }