import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CartService {

  items = [];

  orderedPizza = [];

  constructor() { }

  // Basically get a pizza array and turn it into an array of objects
  addToCart(pizza) {
    // First, clear the items array
    this.items = [];
    // items will be an array of ARRAYS
    this.items.push(pizza);

    for (const item of this.items) {
      // orderedPizza will be an array of OBJECTS
      // Each pizza order will be an object
      this.orderedPizza.push(      
      {
        crust: item[0],
        cheese: item[1],
        meat: item[2],
        veggies: item[3]
      });
    }
  }


  clearCart() {
    this.orderedPizza = [];
    return this.orderedPizza;
  }

  getItems() {
    // Return the array of orders objects
    return this.orderedPizza;
  }

}