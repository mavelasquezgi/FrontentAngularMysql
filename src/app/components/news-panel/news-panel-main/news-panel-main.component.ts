import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import {ActivatedRoute, Router} from '@angular/router'
import { CategoriesService } from 'src/app/_services/categories.service';
import { OrdersService } from 'src/app/_services/orders.service';
import { AuthService } from 'src/app/_services/auth.service';

interface HtmlInputEvent extends Event {
  // para realizar el auto completado al codificar
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-news-panel-main',
  templateUrl: './news-panel-main.component.html',
  styleUrls: ['./news-panel-main.component.scss']
})
export class NewsPanelMainComponent implements OnInit {

  itemIn: any;
  id: string;
  product: any;
  //categories list
  listCategories: any[] = [];
  photoSelected: string | ArrayBuffer;
  file: File;
  role: string | undefined;
  permit:string = "Admin"

  // boolean for modal
  switchModal: boolean;

  constructor(public datepipe: DatePipe,private router:Router, public categoriesServices: CategoriesService, public productServices:ProductService,public ordersService: OrdersService, private activateRoute: ActivatedRoute, private Route: Router, private authServices: AuthService) {

  }

  ngOnInit(): void {
    this.productServices.product(this.id).subscribe((res) => {
      this.itemIn = res;
      //console.log(this.listCategories)
    }, (err) => {
      console.log(err);
    });

    this.activateRoute.params.subscribe(params =>{
      console.log(params['id']);
      this.productServices.product(params['id']).subscribe(res => this.product = res, err => console.log(err));
    } )

    this.categoriesServices.allCategories().subscribe((res) => {
      this.listCategories = res;
      //console.log(this.listCategories)
    }, (err) => {
      console.log(err);
    });

    this.ordersService.$modal.subscribe((value)=> (this.switchModal = value));

    this.role = this.authServices.currentUserValue.role

  }

  delProduct(id:HTMLInputElement) {
    console.log(id.value);
    const result = window.confirm("Desea eliminar el producto definitivamente");
    console.log(result);
    
    if (result) {
      this.productServices.delproduct(id.value).subscribe(res => this.router.navigate(['']), err => console.log(err));
    }
    
  }

  onSubmit(id:HTMLInputElement, name:HTMLInputElement,category:HTMLInputElement,descrip:HTMLInputElement,price: HTMLInputElement,wheigth:HTMLInputElement,image:HTMLIFrameElement) {
    //this.productServices.createProduct(body).subscribe(res => console.log(res),err => console.log(err));
    // this is alternativa for save product
    if (this.authServices.currentUserRole == "Customer") {
      window.alert("No autorizado para editar el producto");
      window.location.reload()
    } else {
      this.productServices.updateProduct(id.value, name.value,descrip.value,category.value,price.value,wheigth.value,this.file).subscribe(res => this.router.navigate(['']), err => this.router.navigate(['']));
    }
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      // <> type of parameter
      this.file = <File> event.target.files[0];
      //image preview
      // esto permite la visualización de la imagen subida
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  } 

  openModal () {
    this.switchModal = !this.switchModal;
  }

}
