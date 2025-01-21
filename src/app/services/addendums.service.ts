import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddendumsService {

  constructor(private http: HttpClient) { }

  addOrUpdateAddendum(addendumData: any): Observable<any> {
    return this.http.put(`${environment.addendumUrl}/AddOrUpdateAddendum`, addendumData)
  }

  getAllAddendums(transportationModuleId: number, addendumData: any): Observable<any> {
    return this.http.post(`${environment.addendumUrl}/GetAllAddendums?transportationModuleId=${transportationModuleId}`, addendumData)
  }
}
