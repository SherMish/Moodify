import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import * as moment from "moment";
import { authResponseServer } from '../models/response.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serverUrl = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  userRegister(reqBody: {username:string, email:string, password:string}): Observable<authResponseServer> {
    return this.http.post<authResponseServer>(`${this.serverUrl}/users/register`, reqBody);
  }

  userLogin(reqBody: {username:string, password:string}): Observable<authResponseServer> {
    return this.http.post<authResponseServer>(`${this.serverUrl}/users/login`, reqBody);
  }

  loadDashboard() {
    return this.http.get<any>(`${this.serverUrl}/users/protected`);
  }

  isFirstEntry(username) {
    return this.http.post<any>(`${this.serverUrl}/dashboard/first-entry`, {username: username})
  }


}
