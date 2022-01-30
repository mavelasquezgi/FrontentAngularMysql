import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private URL = environment.url;

  constructor(private http: HttpClient, private router: Router) { 

  }
  allproducts() {
    return this.http.get<any[]>(`${this.URL}/allproducts`); 
  }

  createProduct(body: any) {
    console.log(body);
    console.log("createproduct");
    const req = new HttpRequest('POST', `${this.URL}/createproduct`, body, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  updateProduct(id:any, name: string,descrip: string,category:number, price:string, wheigth:string, image:File) {
    const body = {
      id,
      name,
      descrip,
      category,
      price,
      wheigth,
      image
    }
    console.log(body);
    
    const req = new HttpRequest('POST', `${this.URL}/updateproduct`, body, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
// alternativa para crear productos
  create2Product(name: string,descrip: string,category:string, price:string, wheigth:string, image:File) {
    const body = new FormData()
    body.append('name',name);
    body.append('descrip',descrip);
    body.append('category',category);
    body.append('price',price);
    body.append('wheigth',wheigth);
    body.append('image',image);
    console.log(body);
    console.log("createproduct");
    return this.http.post(`${this.URL}/createproduct`, body);
  }
  
}
