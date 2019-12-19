import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // items = [[["Original", "Medium", "Normal", "BBQ"], ["Normal", "Parmesan", "cheddar"], ["Sausage", "beef"], ["tomatoes", "spinach"]]];

  items = [];
  cheeseToppings = [];
  meatToppings = [];
  veggiesToppings = [];

  constructor(private cartService: CartService) { }

  ngOnInit() { 
    this.items = this.cartService.getItems();
    if(this.items[0] && this.items[0].length > 1) {
      this.cheeseToppings = this.items[0][1].slice(1, this.items[0][1].length);
      this.meatToppings = this.items[0][2];
      this.veggiesToppings = this.items[0][3];
    }
  } 
}