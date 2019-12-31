import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items;

  totalPrice: Number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() { 
    // this items will be an array of objects
    this.items = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.cartService.total.subscribe(price => this.totalPrice = price);
  }

  changeQty(index) {
    this.cartService.changeQty(index);
  }

  clearCart() {
    this.items = [];
    this.totalPrice = 0;
    this.cartService.clearCart();
  }

  deleteItem(index, price) {
    this.cartService.deleteItem(index, price);
  }
}