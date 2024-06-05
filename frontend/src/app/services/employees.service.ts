import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEmployee } from '../interfaces/employee.interface';
import { API_URL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private urlApi = `${API_URL}/api/v1/`;
  public employees !: IEmployee[]

  constructor(private httpClient : HttpClient) { }

  index(query: any = {}) : Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(`${this.urlApi}employees/`, { params: query })
  }

  create(data : any) : Observable<any> {
    return this.httpClient.post(`${this.urlApi}employees/`, data)
  }

  show(id : number | string) : Observable<IEmployee>{
    return this.httpClient.get<IEmployee>(`${this.urlApi}employees/${id}/`)
  }

  update(id: number | string, employee: any) : Observable<any> {
    return this.httpClient.put(`${this.urlApi}employees/${id}/`, employee)
  }

  delete(id: number | string) : Observable<any> {
    return this.httpClient.delete(`${this.urlApi}employees/${id}/`)
  }

}