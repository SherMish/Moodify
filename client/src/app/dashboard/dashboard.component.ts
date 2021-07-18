import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UsersService,
              private http: HttpClient) { }

  message: string;
  isAuthorized: boolean;

  ngOnInit(): void {
    this.userService.loadDashboard().subscribe(
      (response) => {
      if (response) {
        let username = localStorage.getItem('username');
        this.message = `Hello ${username}!`
        this.isAuthorized = true;
      }
    },

    (error) => {
      if (error.status === 401) {
        this.message = 'You are not authorized to be here, please login!';
        this.isAuthorized = false;
      }
      console.log(error);
    }, 

    () => {

    }
  );
  }




}
