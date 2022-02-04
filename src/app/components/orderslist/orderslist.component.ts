import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/_services/orders.service';

@Component({
  selector: 'app-orderslist',
  templateUrl: './orderslist.component.html',
  styleUrls: ['./orderslist.component.scss']
})
export class OrderslistComponent implements OnInit {

  ordersList: any[];

  constructor(public ordersServices: OrdersService) { }

  ngOnInit(): void {
    this.ordersServices.orders().subscribe((res) => {
      this.ordersList = res;
      //console.log(this.products)
    }, (err) => {
      console.log(err);
    });   
  }

  genetatePdf () {
    
  }
}
