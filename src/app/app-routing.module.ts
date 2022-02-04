import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

//Services
import { AuthGuard } from "./_services/auth.guard";
import { IssignedguardService } from './_services/issignedguard.service';

//Models
import { Role } from './_models/role';

//Components

import { HomeComponent } from './components/home/home.component';
import { NewsPanelMainComponent } from "./components/news-panel/news-panel-main/news-panel-main.component";
import { SignupComponent } from "./components/signup/signup.component";
import { SigninComponent } from "./components/signin/signin.component";
import { MainFormComponent } from "./components/main-form/main-form.component";
import { OrderslistComponent } from "./components/orderslist/orderslist.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent    
  },
  {
    path: "list/:id",
    component: NewsPanelMainComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Official, Role.Admin] }
  },
  {
    path: "form",
    component: MainFormComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Official, Role.Admin] }
  },
  {
    path: "signin",
    component: SigninComponent,
    canActivate: [IssignedguardService],
  },
  {
    path: "signup",
    component: SignupComponent,
    canActivate: [IssignedguardService],
  },
  {
    path: "orders",
    component: OrderslistComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
