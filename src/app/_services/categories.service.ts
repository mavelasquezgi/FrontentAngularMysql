import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  // read enviroment for backend url
  private URL = environment.url;

  constructor(private http: HttpClient, private router: Router) {

   }
   allCategories() {
    return this.http.get<any[]>(`${this.URL}/categories`); 
  }
}
