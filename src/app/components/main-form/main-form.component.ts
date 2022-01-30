import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadService } from '../../_services/upload.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { CategoriesService } from 'src/app/_services/categories.service';
import { ProductService } from 'src/app/_services/product.service';

// para manejar los eventos en la aplicación
interface HtmlInputEvent extends Event {
  // para realizar el auto completado al codificar
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})

export class MainFormComponent implements OnInit {

  //categories list
  listCategories: any[] = [];

  // field or property of class
  file: File; 

  // current photo
  photoSelected: string | ArrayBuffer;

  //Reactive Form
  autoForm = this.fb.group({

  });

  constructor(public productServices:ProductService, protected fb: FormBuilder, public dialog: MatDialog, public datepipe: DatePipe, public categoriesServices: CategoriesService ) { }

  ngOnInit(): void {
    this.categoriesServices.allCategories().subscribe((res) => {
      this.listCategories = res;
      //console.log(this.listCategories)
    }, (err) => {
      console.log(err);
    });
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

  onSubmit(name:HTMLInputElement,category:HTMLInputElement,descrip:HTMLInputElement,price: HTMLInputElement,wheigth:HTMLInputElement,image:HTMLIFrameElement) {

    const body = {
      name:name.value,
      descrip:descrip.value,
      category:category.value,
      price: price.value,
      wheigth: wheigth.value,
      image: this.file
    }
    console.log(body);
    console.log(typeof(category.value));
    this.productServices.createProduct(body).subscribe(res => console.log(res),err => console.log(err));
    // this is alternativa for save product
    //this.productServices.create2Product(name.value,descrip.value,category.value,price.value,wheigth.value,this.file).subscribe(res => console.log(res),err => console.log(err));
  }
}
