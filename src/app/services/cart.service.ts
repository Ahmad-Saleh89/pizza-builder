import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CartService {

  items = [];

  constructor() { }

  addToCart(pizza) {
    this.items.push(pizza);
  }

  getItems() {
    return this.items;
  }

  // clearCart() {
  //   this.items = [];
  //   return this.items;
  // }

}