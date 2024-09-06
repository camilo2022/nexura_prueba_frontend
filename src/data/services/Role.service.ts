import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../../domain/models/Role.model';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = `${environment.url}/Roles`;

  constructor(private httpClient: HttpClient) {}

  all(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.url}/All`);
  }

  index(table: object, page: number): Observable<Role[]> {
    return this.httpClient.post<Role[]>(`${this.url}/Index?page=${page}`, table);
  }

  store(role: Role): Observable<any>  {
    return this.httpClient.post(`${this.url}/Store`, role);
  }

  edit(id: number): Observable<any>  {
    return this.httpClient.post(`${this.url}/Edit/${id}`, null);
  }

  update(role: Role, id: number): Observable<any>  {
    return this.httpClient.put(`${this.url}/Update/${id}`, role);
  }
}
