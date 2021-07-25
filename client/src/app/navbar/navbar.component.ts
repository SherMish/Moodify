import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private dataSharingService: DataSharingService) { }
  is_logged: boolean;

  ngOnInit(): void {
    if (!localStorage.getItem('username')) {
      this.dataSharingService.isUserLoggedIn.subscribe( value => {
        this.is_logged = value;
      })
    }

    if (localStorage.getItem('username')) this.is_logged = true;
    

  }

  logout() {
    localStorage.clear();
    this.dataSharingService.isUserLoggedIn.next(false);
    window.location.reload();

  }

  //TODO: https://stackoverflow.com/questions/46047854/how-to-update-a-component-without-refreshing-full-page-angular/46049546
  // Reload the component when a user registers/logins, to view the logout button.

}
