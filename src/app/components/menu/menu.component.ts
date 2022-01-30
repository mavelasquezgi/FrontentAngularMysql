import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ResponsiveDevicesService } from 'src/app/_services/responsive-devices.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menuLogOut: any = [];
  menuLogIn: any = [];

  diviceXs!: boolean;
  diviceSm!: boolean;

  constructor(public authService: AuthService, private responsiveDevicesService: ResponsiveDevicesService) {

    this.menuLogOut = [
      {
        title: "Inicio",
        url: "/home"
      },      
      {
        title: "Iniciar Sesión",
        url: "/signin"
      }
    ]

    this.menuLogIn = [
      {
        title: "Inicio",
        url: "/home",
        roles: ["Admin", "Student", "Official"]
      },
      {
        title: "Crear producto",
        url: "/form",
        roles: ["Admin", "Official"]
      },
      {
        title: "Ver Solicitudes",
        url: "/list",
        roles: ["Admin", "Student", "Official"]
      }
    ]

  }

  ngOnInit(): void {

    this.responsiveDevicesService.dievice$.subscribe(res => {      
      this.diviceXs = res === 'xs' ? true : false;
      this.diviceSm = res === 'sm' ? true : false;
    })

  }

  checkRole(roles) {
    return Boolean(roles.find(obj => obj === this.authService.currentUserValue.role))
  }

}
