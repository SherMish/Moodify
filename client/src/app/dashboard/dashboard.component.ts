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

  ngOnInit(): void {
    this.userService.loadDashboard().subscribe(
      (response) => {
      if (response) {
        this.message = response.messsage;
        console.log(response);
      }
    },

    (error) => {
      if (error.status === 401) {
        this.message = 'You are not authorized to visit this route.............  No data is displayed.';
      }

      console.log(error);
    }, 

    () => {
      console.log('HTTP request done! ' + this.message);
    }
  );

  }

}
