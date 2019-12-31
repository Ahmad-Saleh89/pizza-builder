import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CartService {

  // orderedItems will be an array of OBJECTS
  orderedItems = [];

  constructor() { }

  addToCart(item) {
      // item.length: because in Create Your Own Pizza, the received item will be an array
      if(item.length) {
        this.convertToObj(item);
      }else{ 
        // Just a regular pre-built pizza 
        // the received item is already an Object
        this.orderedItems.push(item);
      }
  }

  // Convert the item array into an object
  convertToObj(item) {     // [[crust & size], [cheese], [meat], [veggies]]
    const itemObj = 
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
        singlePrice: 8,
        price: 0,
        quantity: 1,
        image: 'https://p7.hiclipart.com/preview/127/761/313/pizza-bagel-delicatessen-clip-art-pizza-png-clipart.jpg'
      };

      this.calcsinglePrice(itemObj);
      this.orderedItems.push(itemObj);
  }

// For Customized Pizza Orders Only
  calcsinglePrice(item) {
    switch (item.crust.size) {
      case 'Medium':
      item.singlePrice = 9;
      break;

      case 'Large':
      item.singlePrice = 10; 
      break;

      default:
      item.singlePrice = 8;
    }

    item.singlePrice = Math.round((item.singlePrice + item.cheese.price + item.meat.price + item.veggies.price) * 100) / 100;
    item.price = item.singlePrice * item.quantity;

    return item;
  }

  getItems() {
    return this.orderedItems;
  }

  clearCart() {
    this.orderedItems = [];
    return this.orderedItems;
  }

}

// For the cheese object, basically I'm trying to exclude the first element of the array because it is not a topping. It's the cheese amount.