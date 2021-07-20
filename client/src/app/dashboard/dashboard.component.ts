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

  message_greeting: string;
  message_is_first_entry: string;
  isAuthorized: boolean;
  first_entry: boolean;

  ngOnInit(): void {
    this.userService.loadDashboard().subscribe(
      (response) => {
      if (response) {
        let username = localStorage.getItem('username');
        this.message_greeting = `Hello ${username}!`
        this.isAuthorized = true;
      }
    },

    (error) => {
      if (error.status === 401) {
        this.message_greeting = 'You are not authorized to be here, please login!';
        this.isAuthorized = false;
      }
      console.log(error);
    }, 

    () => {

    }
  );

    this.userService.isFirstEntry(localStorage.getItem('username')).subscribe(
      (response) => {
        if (response) {
          if (!response.success) {
            alert("Something went wrong. Please try again later")
            console.log(response);
          }
          else if (!response.first_entry) {
            this.first_entry = false;
            this.message_is_first_entry = "It`s good to see you again! So how was your day today?";
          }
          else {
            this.first_entry = true;
            this.message_is_first_entry = "We see that you`re new with us. Let`s get it started :)";
          }
        }
      },
      (error) => {
        if (error.status === 401) {
          this.message_greeting = 'You are not authorized to be here, please login!';
          this.isAuthorized = false;
        }
        console.log(error);
      },
      () => {

      }
    );

  }




}
