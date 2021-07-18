import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor() { }
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

  logout() {
    localStorage.clear();
    window.location.reload();
  }

}
