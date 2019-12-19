import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CartService {

  items = [];

  orderedPizza = [];

  constructor() { }

  addToCart(pizza) {
    this.items = [];
    this.items.push(pizza);
    for (const item of this.items) {
      this.orderedPizza.push(      
      {
        crust: item[0],
        cheese: item[1],
        meat: item[2],
        veggies: item[3]
      });
    }
  }

  getItems() {
    return this.orderedPizza;
  }

  // clearCart() {
  //   this.items = [];
  //   return this.items;
  // }

}