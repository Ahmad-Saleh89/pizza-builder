import { Component, OnInit } from '@angular/core';
import { DessertsService } from '../services/desserts.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.css']
})
export class DessertsComponent implements OnInit {

  desserts = [];
  cart_modal = false;

  constructor(private dessertsService: DessertsService, private cartService: CartService) { }
  
  ngOnInit() {
    this.fetchDesserts();
  }

  fetchDesserts(): void {
   this.dessertsService.getDesserts()
      .subscribe(desserts => {
        this.desserts = desserts;
      });
  }

  addToCart(item) {
    item.price = parseFloat((item.singlePrice * item.quantity).toFixed(2));
    this.cartService.addToCart(item);
    this.showCartModal();
  }

  showCartModal() {
    this.cart_modal = true;
    setTimeout(() =>{
      this.cart_modal = false;
    },2000);
  }
}