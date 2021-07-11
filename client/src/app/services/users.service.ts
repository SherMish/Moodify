import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import * as moment from "moment";
import { registerResponseServer } from '../models/response.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serverUrl = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  userRegister(reqBody: {username:string, email:string, password:string}): Observable<registerResponseServer> {
    return this.http.post<registerResponseServer>(`${this.serverUrl}/users/register`, reqBody);
  }

  userLogin(username, password) {
    return this.http.post(`${this.serverUrl}/users/login`, {username: username, password: password}).subscribe((res) => {console.log(res)});
  }

  loadDashboard() {
    return this.http.get<any>(`${this.serverUrl}/users/protected`);
  }


}
