import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

  message: string;
  isAuthorized: boolean;
  username: string;
  first_entry: boolean;
  entries: [];

  constructor(private userService: UsersService) { }

  ngOnInit(): void {

    //authorize and get all the entries
    this.userService.isAuth().subscribe(
      (response) => {
      if (response) {
        this.username = localStorage.getItem('username');
        this.isAuthorized = true;
        
        this.userService.isFirstEntry(this.username).subscribe(
          (response) => {
            if (response) {
              if (!response.success) {
                alert("Something went wrong. Please try again later")
                console.log(response);
              }
              else if (!response.first_entry) {
                this.first_entry = false;
                this.userService.getEntries(this.username).subscribe(
                  (response) => {
                    if (response) {
                      if (!response.success) {
                        alert("Something went wrong. Please try again later")
                        console.log(response)
                      }
                      else {
                        this.entries = response.result;
                        console.log(this.entries)
                      }
                    }
                  },
                  (error) => {
                    if (error.status === 401) {
                      this.message = 'You are not authorized to be here, please login!';
                      this.isAuthorized = false;
                    }
                  }
                )
              }
              else {
                this.first_entry = true;
              }
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
