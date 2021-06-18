import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  //Reactive Form
  signInForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  loading = false;
  submitted = false;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {

  }

  signIn(signInData: any) {
    this.submitted = true;
    this.loading = true;
    this.authService.login(signInData.username, signInData.password)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from route parameters or default to '/'
          const returnUrl = '/home' || this.route.snapshot.queryParams['returnUrl'];
          this.router.navigate([returnUrl]);
        },
        error: error => {
          this.error = error;
          this.loading = false;
          this.signInForm.reset();
        }
      });
  }
}
