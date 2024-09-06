import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Area } from '../../domain/models/Area.model';


@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private url = `${environment.url}/Areas`;

  constructor(private httpClient: HttpClient) {}

  all(): Observable<Area[]> {
    return this.httpClient.get<Area[]>(`${this.url}/All`);
  }

  index(table: object, page: number): Observable<Area[]> {
    return this.httpClient.post<Area[]>(`${this.url}/Index?page=${page}`, table);
  }

  store(area: Area): Observable<any>  {
    return this.httpClient.post(`${this.url}/Store`, area);
  }

  edit(id: number): Observable<any>  {
    return this.httpClient.post(`${this.url}/Edit/${id}`, null);
  }

  update(area: Area, id: number): Observable<any>  {
    return this.httpClient.put(`${this.url}/Update/${id}`, area);
  }
}
