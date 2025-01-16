import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private http: HttpClient) { }

  getCompanies(filter: string): Observable<any> {
    return this.http.get(`${environment.autoComplate}/GetClients?filter=${filter}`)
  }

  getPointsByTransportationModule(filter: string, transportationModuleType: number): Observable<any> {
    return this.http.get(`${environment.autoComplate}/GetPointsByTransportationModule?filter=${filter}&transportationModuleType=${transportationModuleType}`)
  }

  getAllPoints(filter: string): Observable<any> {
    return this.http.get(`${environment.autoComplate}/GetAllPoints?filter=${filter}`)
  }

}
