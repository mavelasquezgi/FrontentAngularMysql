import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import {ActivatedRoute, Router} from '@angular/router'

@Component({
  selector: 'app-news-panel-main',
  templateUrl: './news-panel-main.component.html',
  styleUrls: ['./news-panel-main.component.scss']
})
export class NewsPanelMainComponent implements OnInit {

  itemIn: any;
  id: string;
  product: any;

  constructor(public datepipe: DatePipe, public productServices:ProductService, private activateRoute: ActivatedRoute, private Route: Router) {

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
  }

  delProduct(id:string) {
    console.log(id);
    this.productServices.delproduct(id).subscribe(res => window.location.reload(), err => console.log(err));
  }

}
