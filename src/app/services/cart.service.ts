import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CartService {

  // items will be an array of OBJECTS
  items = [];

  totalPrice = 0;

  // Total Price Observable
  private totalPriceSource = new Subject();
  total = this.totalPriceSource.asObservable();

  constructor() { }

  addToCart(item) {
      // item.length: because in Create Your Own Pizza, the received item will be an array
      if(item.length) {
        this.convertToObj(item);
      }else{
        // Any item other than the Customized pizza
        // the received item will be an Object here
        this.items.push(item);

        // In Non-Customized (pre-built) Pizza | Convert toppings object into toppings array
        if(item.toppings) {
          item.toppingsArr = []
          for (let topping in item.toppings){
            item.toppingsArr.push(topping);
          }
        }
        // Calculate total price
        this.totalPrice += Math.round(item.price * 100) / 100;
      }
  }

  // Convert the item array into an object
  // For Customized Pizza Orders Only
  // [[crust & size], [cheese], [meat], [veggies]]
  convertToObj(item) {
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
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtvh0Ayi7uK_DuMqtdUBBV1IdyA1m7ViPTOkTykNlREyQbs7SN&s'
      };

      this.calculatePrice(itemObj);
      this.items.push(itemObj);
  }

// For Customized Pizza Orders Only
  calculatePrice(item) {
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

      // Calculate total price
    this.totalPrice += Math.round(item.price * 100) / 100;
    return item;
  }

  getItems() {
    return this.items;
  }

  getTotalPrice() {
    return this.totalPrice;
  }

  clearCart() {
    this.items = [];
    this.totalPrice = 0;
    return this.items;
  }

  changeQty(index) {
    // First: substract the current price of this very item from the total price
    this.totalPrice -= this.items[index].price;
    // Second: calculate the new price of this very item
    this.items[index].price = this.items[index].singlePrice * this.items[index].quantity;
    // Last: add the new price to the total price
    this.totalPrice += this.items[index].price;
    // Update total price Observable
    this.totalPriceSource.next(this.totalPrice);
  }

  deleteItem(index, price) {
    this.items.splice(index, 1);
    this.totalPrice -= price;
    // Update total price Observable
    this.totalPriceSource.next(this.totalPrice);
  }
}

// For the cheese object, basically I'm trying to exclude the first element of the array because it is not a topping. It's the cheese amount.