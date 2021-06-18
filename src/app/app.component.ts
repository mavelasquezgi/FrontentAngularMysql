import { Component } from '@angular/core';

import { AuthService } from './_services/auth.service';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { NavigationEnd, Router } from '@angular/router';
import { ResponsiveDevicesService } from './_services/responsive-devices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'GESOFIA';
  
  menuLogIn: any = [];
  companyLogo: string ;
  diviceXs!: boolean;
  diviceSm!: boolean;
  mediaSub: any;
  showLogoOfCompany: boolean = false;

  constructor(private router: Router, public authService: AuthService, public mediaObserver: MediaObserver, private responsiveDevicesService: ResponsiveDevicesService) { 
    
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });

    this.mediaSub = this.mediaObserver.media$.subscribe((result:MediaChange)=> {
      this.responsiveDevicesService.changeDevice(result.mqAlias);
      this.diviceXs = result.mqAlias === 'xs' ? true : false;
      this.diviceSm = result.mqAlias === 'sm' ? true : false;
    })
 }

  ngDoCheck() {
    let currentUrl;

    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd ) {

        currentUrl = event.url;

      }

      if(currentUrl != '/' && currentUrl != '/home'){
        this.showLogoOfCompany = true;
      }
      else{
        this.showLogoOfCompany = false;
      }
    });
  }
}
