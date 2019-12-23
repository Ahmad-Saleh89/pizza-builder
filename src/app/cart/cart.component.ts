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

    for (let item of this.items) {
      item.price = Math.round((10 + item.cheese.price + item.meat.price + item.veggies.price) * 100) / 100 ;
      this.totalPrice += Math.round(item.price * 100) / 100;
    }
  }

  clearCart() {
    this.items = [];
    this.cartService.clearCart();
  }

  deleteItem(index, price) {
    this.items.splice(index, 1);
    this.totalPrice -= price;
  }
}