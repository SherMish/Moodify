import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  greeting_msg: string;
  is_logged: boolean;

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    if (username) {
      this.is_logged = true;
    }
    else {
      this.is_logged = false;
    }
  }

}
