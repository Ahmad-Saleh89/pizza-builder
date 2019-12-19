import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CartService {

  // items = [];

  items = [[["Original", "Medium", "Normal", "BBQ"], ["Normal", "Parmesan", "cheddar"], ["Sausage", "beef"], ["tomatoes", "spinach"]]];
  constructor() { }

  addToCart(pizza) {
    // this.items.push(pizza);
    for (const item of this.items) {
      console.log(item);
    }
    
  }

  getItems() {
    return this.items;
  }

  // clearCart() {
  //   this.items = [];
  //   return this.items;
  // }

}