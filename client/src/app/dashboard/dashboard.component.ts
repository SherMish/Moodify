import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { dailyMoodEntry } from '../models/entry.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    moodForm = new FormGroup({
    wake_up: new FormControl(),
    hours_slept: new FormControl(),
    work: new FormControl(),
    study: new FormControl(),
    romantic_relationship: new FormControl(),
    social_life: new FormControl(),
    hobbies: new FormControl(),
    productive: new FormControl(),
    substances: new FormControl(),
    sexual_activity: new FormControl(),
    mood: new FormControl(),
    additional_info: new FormControl()
  });
    

  constructor(private userService: UsersService,
              private http: HttpClient) { }

  message_greeting: string;
  message_is_first_entry: string;
  isAuthorized: boolean;
  first_entry: boolean;

  ngOnInit(): void {

    this.userService.isAuth().subscribe(
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
            this.message_is_first_entry = "It`s good to see you again!";
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

  onSubmit() {   
    let entry = <dailyMoodEntry>{ };

    entry.wake_up = this.moodForm.value.wake_up;
    entry.hours_slept = this.moodForm.value.hours_slept;
    entry.work = this.strToBool(this.moodForm.value.work);
    entry.study = this.strToBool(this.moodForm.value.study);
    entry.romantic_relationship = this.strToBool(this.moodForm.value.romantic_relationship);
    entry.social_life = this.strToBool(this.moodForm.value.social_life);
    entry.hobbies = this.strToBool(this.moodForm.value.hobbies);
    entry.productive = this.moodForm.value.productive;
    entry.substances = this.strToBool(this.moodForm.value.substances);
    entry.sexual_activity = this.strToBool(this.moodForm.value.sexual_activity);
    entry.mood = this.moodForm.value.mood;
    entry.additional_info = this.moodForm.value.additional_info;

    this.userService.addEntry(entry, localStorage.getItem('username')).subscribe( (result) => console.log(result));
  }

  strToBool(str) {
    return (str);
  }




}
