import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private http: HttpClient) { }

  getMenus(id: number): Observable<any> {
    return this.http.get(`${environment.requestUrl}/Global/GetMenus/${id}`)
  }
}
