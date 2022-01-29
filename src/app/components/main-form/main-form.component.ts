import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadService } from '../../_services/upload.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';

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

  constructor(protected uploadServices: UploadService, protected fb: FormBuilder, public dialog: MatDialog, public datepipe: DatePipe) { }

  ngOnInit(): void {

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
}
