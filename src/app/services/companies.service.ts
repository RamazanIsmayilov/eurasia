import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {

  constructor(private http: HttpClient) { }

  getCompanies(companyData: any): Observable<any> {
    return this.http.post(`${environment.companyUrl}/GetAllCompanies`, companyData)
  }

  getCompanyById(id: number): Observable<any> {
    return this.http.get(`${environment.companyUrl}/GetCompanyById/${id}`)
  }

  addOrUpdateCompany(companyData: any): Observable<any> {
    return this.http.put(`${environment.companyUrl}/AddOrUpdateCompany`, companyData)
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`${environment.companyUrl}/DeleteCompany/${id}`)
  }
}
