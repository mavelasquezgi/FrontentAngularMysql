import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './_modules/material/material.module'
import { ReactiveFormsModule } from '@angular/forms';

//Services
import { AuthGuard } from './_services/auth.guard';
import { TokenInterceptorService } from './_services/token-interceptor.service';
import { ResponsiveDevicesService } from './_services/responsive-devices.service';

//Components
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { NewsCardComponent } from './components/news-panel/news-card/news-card.component';
import { NewsPanelMainComponent } from './components/news-panel/news-panel-main/news-panel-main.component';

import { SearchPanelComponent } from './components/news-panel/search-panel/search-panel.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ViewpdfComponent } from './components/viewpdf/viewpdf.component';

//Pipes
import { CommonModule, DatePipe } from '@angular/common';
import { FormatTimePipe } from './_pipes/format-time-pipe';
import { ThousandsPipe } from './_pipes/thousand-pipe';
import { SafePipe } from './_pipes/safeurl-pipe';
import { MainFormComponent } from './components/main-form/main-form.component';
import { OrdermodalComponent } from './components/news-panel/ordermodal/ordermodal.component';
import { OrderslistComponent } from './components/orderslist/orderslist.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    NewsCardComponent,
    NewsPanelMainComponent,
    SearchPanelComponent,
    SignupComponent,
    SigninComponent,
    ViewpdfComponent,
    //Pipes
    FormatTimePipe,
    SafePipe,
    ThousandsPipe,
    MainFormComponent,
    OrdermodalComponent,
    OrderslistComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    // CommonModule,
    CdkTableModule,
    ClipboardModule,
    CdkTableModule,
    FormsModule,
    FlexLayoutModule,
    FontAwesomeModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    ResponsiveDevicesService
  ],
  entryComponents: [
    MenuComponent,
    NewsCardComponent,
    SearchPanelComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
