import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  $modal = new EventEmitter<any>();

  private URL = environment.url;

  constructor(private http: HttpClient, private router: Router) { }

  orders() {
    return this.http.get<any[]>(`${this.URL}/orders`);
  }

  createOrder(body: any) {
    console.log(body);
    console.log("createOrdert");
    const req = new HttpRequest('POST', `${this.URL}/createorder`, body, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
