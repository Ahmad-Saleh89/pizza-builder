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

    // Calculate item's price & total price
    for (let item of this.items) {
      let initialPrice;
      switch (item.crust.size) {
        case 'Medium':
        initialPrice = 9;
        break;

        case 'Large':
        initialPrice = 10;
        break;

        default:
        initialPrice = 8;
      }
      item.price = Math.round((initialPrice + item.cheese.price + item.meat.price + item.veggies.price) * 100) / 100 ;
      this.totalPrice += Math.round(item.price * 100) / 100;
    }
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