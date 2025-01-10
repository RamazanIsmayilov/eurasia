import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.post(`${environment.requestUrl}/Auth/login`, user)
  }

  logOut(): void {
    this.http.get(`${environment.requestUrl}/Auth/logout`)
    localStorage.removeItem("token")
  }
}
