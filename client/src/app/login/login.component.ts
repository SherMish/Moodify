import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl()

  });

  constructor(private userService: UsersService,
              private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit() {
    this.userService.userLogin(this.loginForm.value.username, this.loginForm.value.password);
    // this.router.navigateByUrl('dashboard');
    
  }

}
