import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { authResponseServer } from '../models/response.model';
import { AuthService } from '../services/auth.service';
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
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
  }


  onSubmit() {
    const reqObject = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }

    this.userService.userLogin(reqObject)
        .subscribe((res: authResponseServer) => {
      if(res.success == true){
        this.auth.setLocalStorage(res);
        this.router.navigateByUrl('/dashboard');
      }
      else {
        alert(res.message);
      }

     });
    
    
  }

}
