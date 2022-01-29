import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menu: any = [];
  products: any[];

  constructor(public authService: AuthService, public productService:ProductService ) {
    this.menu = [
      {
        title: "Crear Solicitud",
        url: "/form"
      },
      {
        title: "verSolicitudes",
        url: "/list"
      }
    ]
  }


  ngOnInit(): void {
    this.productService.allproducts().subscribe((res) => {
      this.products = res;
      //console.log(this.products)
    }, (err) => {
      console.log(err);
    });
    
  }



}
