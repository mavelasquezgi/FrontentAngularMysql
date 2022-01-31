import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
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

  updateProduct(body: any) {
    console.log(body);
    console.log("update");
    const req = new HttpRequest('POST', `${this.URL}/updateproduct`, body, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  delproduct(id:string) {
    const params = new HttpParams()
    params.append("id",id)
    console.log(params," => params");
    
    return this.http.get(`${this.URL}/delproduct/${id}`); 
  }

  product(id:string) {
    const params = new HttpParams()
    params.append("id",id)
    console.log(params," => params");
    return this.http.get(`${this.URL}/product/${id}`); 
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
