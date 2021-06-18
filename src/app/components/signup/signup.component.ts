import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  //Reactive Form 
  signUpForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', Validators.required],
    password2: ['', Validators.required],
    fullname: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  signUp(signUpData: any) {
    let user = {
      username: signUpData.username,
      password: signUpData.password,
      email: signUpData.email,
      fullname: signUpData.fullname,
      password2: signUpData.password2,
    }
    this.authService.signUp(user).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/signin']);
      },
      err => {
        console.log(err);
      }
    )
  }
}
