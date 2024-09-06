import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../domain/models/Employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private url = `${environment.url}/Employees`;

  constructor(private httpClient: HttpClient) {}

  index(table: object, page: number): Observable<Employee[]> {
    return this.httpClient.post<Employee[]>(`${this.url}/Index?page=${page}`, table);
  }

  store(user: Employee): Observable<any>  {
    return this.httpClient.post(`${this.url}/Store`, user);
  }

  edit(id: number): Observable<any>  {
    return this.httpClient.post(`${this.url}/Edit/${id}`, null);
  }

  update(user: Employee, id: number): Observable<any>  {
    return this.httpClient.put(`${this.url}/Update/${id}`, user);
  }

  delete(user: Employee): Observable<any>  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    };
    return this.httpClient.delete(`${this.url}/Delete`, httpOptions);
  }
}
