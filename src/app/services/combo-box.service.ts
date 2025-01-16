import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComboBoxService {

  constructor(private http: HttpClient) { }

  getContractsByCompany(companyId: number): Observable<any> {
    return this.http.get(`${environment.comboBox}/GetContractsByCompany?companyId=${companyId}`)
  }

  getTransportModuleTypes(): Observable<any> {
    return this.http.get(`${environment.comboBox}/GetTransportModuleTypes`)
  }

  getTransportTypes(): Observable<any> {
    return this.http.get(`${environment.comboBox}/GetTransportTypes`)
  }

  getBorderStations(): Observable<any> {
    return this.http.get(`${environment.comboBox}/GetBorderStations`)
  }

  getTransportCategories(transportationModuleId: number): Observable<any> {
    return this.http.get(`${environment.comboBox}/GetTransportCategories?transportationModuleId=${transportationModuleId}`)
  }

  getTransportTypesByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${environment.comboBox}/GetTransportTypesByCategory?categoryId=${categoryId}`)
  }
}
