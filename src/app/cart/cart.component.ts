import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items;

  totalPrice = 0;
  constructor(private cartService: CartService) { }

  ngOnInit() { 
    // this items will be an array of objects
    this.items = this.cartService.getItems();

    // Calculate total price
    for (let item of this.items) {
      this.totalPrice += Math.round(item.price * 100) / 100;
    }
  }

  changeQty(index) {
    // First: substract the current price of this very item from the total price
    this.totalPrice -= this.items[index].price;
    // Second: calculate the new price of this very item
    this.items[index].price = this.items[index].initialPrice * this.items[index].quantity;
    // Last: add the new price to the total price
    this.totalPrice += this.items[index].price;
  }

  clearCart() {
    this.items = [];
    this.totalPrice = 0;
    this.cartService.clearCart();
  }

  deleteItem(index, price) {
    this.items.splice(index, 1);
    this.totalPrice -= price;
  }
}