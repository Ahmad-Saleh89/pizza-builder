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
      switch (item.crust.size) {
        case 'Medium':
        item.initialPrice = 9;
        break;

        case 'Large':
        item.initialPrice = 10;
        break;

        default:
        item.initialPrice = 8;
      }
      item.initialPrice = Math.round((item.initialPrice + item.cheese.price + item.meat.price + item.veggies.price) * 100) / 100;
      item.price = item.initialPrice * item.quantity;
      this.totalPrice += Math.round(item.price * 100) / 100;
    }
  }

  changeQty(index) {
    this.totalPrice -= this.items[index].price;
    this.items[index].price = this.items[index].initialPrice * this.items[index].quantity;
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