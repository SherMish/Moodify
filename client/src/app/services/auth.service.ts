import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { authResponseServer } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  setLocalStorage(responseObj: authResponseServer) {
    // Adds the expiration time defined on the JWT to the current moment
    const expiresAt = moment().add(Number.parseInt(responseObj.expiresIn), 'days');

    localStorage.setItem('id_token', responseObj.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    localStorage.setItem('username', responseObj.user.username)
  }          

  logout() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration(), "second");
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
        if (expiration) {
            const expiresAt = JSON.parse(expiration);
            return moment(expiresAt);
        } else {
            return moment();
        }
  }    
}
