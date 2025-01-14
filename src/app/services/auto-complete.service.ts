import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private http: HttpClient) { }

  getCompanies(filterData: string): Observable<any> {
    return this.http.get(`${environment.autoComplate}/GetClients?filter=${filterData}`)
  }

}
