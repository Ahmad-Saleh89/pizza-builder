import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // items = [[["Original", "Medium", "Normal", "BBQ"], ["Normal", "Parmesan", "cheddar"], ["Sausage", "beef"], ["tomatoes", "spinach"]]];

  items;

  constructor(private cartService: CartService) { }

  ngOnInit() { 
    this.items = this.cartService.getItems();
  }

  clearCart() {
    this.items = [];
  }
}