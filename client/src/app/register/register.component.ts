import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { authResponseServer } from '../models/response.model';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl()

  });

  constructor(private userService: UsersService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const reqObject = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password
    };

    this.userService.userRegister(reqObject)
        .subscribe((res: authResponseServer) => {
          
          if(res.success == true){
            alert("Registration completed succesfully!");
            this.auth.setLocalStorage(res);
            this.router.navigateByUrl('/dashboard');
          }
          else {
            alert(res.message);
          }

         });
        }
}
    

  



