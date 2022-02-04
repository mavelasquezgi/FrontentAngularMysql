import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(public authService: AuthService, public productService:ProductService, private router: Router) {

  }

  ngOnInit(): void {
    this.productService.allproducts().subscribe((res) => {
      this.products = res;
      //console.log(this.products)
    }, (err) => {
      console.log(err);
    });    
  }

  updateProduct() {
    //this.productService.updateProduct();
  }

  delProduct(id:HTMLInputElement) {
    console.log(id.value);
    this.productService.delproduct(id.value).subscribe(res => window.location.reload(), err => console.log(err));
  }

  selectedCard (id:string){
    console.log(id)
    this.router.navigate(['/list',id]);
    this.productService.product(id).subscribe(res => console.log(res), err => console.log(err));
  }

  generatePdf() {
    this.productService.productsPdf().subscribe(res => window.alert("PDF generado de forma exitosa"), err => (window.alert("No fue posible generar el PDF"),console.log(err)));
  }
}
