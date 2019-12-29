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
  }

  // Convert the items array into an array of objects
  convertToObj() {
    for (const item of this.items) {
      // orderedPizza will be an array of OBJECTS
      // Each pizza order will be an object
      this.orderedPizza.push(  
      {
        crust: {
          style: item[0][0],
          size: item[0][1],
          cut: item[0][2],
          sauce: item[0][3]
        },
        cheese: { // see notes bellow
          toppings: item[1].slice(1, item[1].length),
          price: (item[1].length - 1) * 1.4
        },
        meat: {
          toppings: item[2],
          price: item[2].length * 1.8
        },
        veggies: {
          toppings: item[3],
          price: item[3].length * 1.2
        },
        initialPrice: 8,
        price: 0,
        quantity: 1
      });
    }
  }

  // Calculate each item's price
  calcItemPrice() {
    for (let item of this.orderedPizza) {
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
    }
  }

  getItems() {
    this.convertToObj();
    this.calcItemPrice();
    // Return the array of orders objects
    return this.orderedPizza;
  }

  clearCart() {
    this.orderedPizza = [];
    return this.orderedPizza;
  }

}

// For the cheese object, basically I'm trying to exclude the first element of the array because it is not a topping. It's the cheese amount.