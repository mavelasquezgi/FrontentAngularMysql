import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { OrdersService } from 'src/app/_services/orders.service';

@Component({
  selector: 'app-ordermodal',
  templateUrl: './ordermodal.component.html',
  styleUrls: ['./ordermodal.component.scss']
})
export class OrdermodalComponent implements OnInit {

  @Input('input') idproduct;

  constructor(private ordersServices: OrdersService, public authService: AuthService,) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.ordersServices.$modal.emit(false);
  }

  saveOrder (units:HTMLInputElement) {
    let body: any ={
      user: this.authService.currentUserValue.username,
      product: this.idproduct,
      units: units.value
    }
    console.log(this.authService.currentUserValue.username);
    
    console.log(body);
    
    this.ordersServices.createOrder(body).subscribe(res => console.log(res), err => console.log(err));
    this.ordersServices.$modal.emit(false);
  }
}
