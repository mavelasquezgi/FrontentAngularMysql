import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  menu: any = [];

  constructor(public authService: AuthService) {
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

  }



}
