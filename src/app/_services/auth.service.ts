import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, UserI } from '../_models/users';
import * as moment from "moment";
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = environment.url;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentUserRole(): string {
    return this.currentUserSubject.value?.role;
  }


  login(username: string, password: string) {
    return this.http.post<User>(`${this.URL}/signin`, { username, password, role:['Admin'] }).pipe(map(userResponse => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      let expiresAt = userResponse.expiresIn;
      userResponse.expiresIn = JSON.stringify(moment().add(expiresAt, 'second'));
      localStorage.setItem('currentUser', JSON.stringify(userResponse));
      this.currentUserSubject.next(userResponse);
      return userResponse;
    }))
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/signin']);
  }

  signUp(user) {
    return this.http.post<UserI>(`${this.URL}/signup`, user);
  }

  loggedIn(): Boolean {
    if (this.currentUserValue?.token && moment().isBefore(this.getExpiration())) return true; else return false;
  }

  getToken() {
    this.currentUserValue.token;
  }
  getExpiration() {
    if (this.currentUserValue) {
      let expiresAt = JSON.parse(this.currentUserValue.expiresIn);
      return moment(expiresAt);
    } else {
      return null;
    }
  }
}
