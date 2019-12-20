import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  // items = [
  //   {
  //     crust: ["Original", "Medium", "Normal", "BBQ"],
  //     cheese: ["Normal", "Mozzarella", "Parmesan"],
  //     meat: ["Sausage", "beef"],
  //     veggies: ["peppers", "onions", "olives"]
  //   },
  //   {
  //     crust: ["Original", "Medium", "Normal", "BBQ"],
  //     cheese: ["Normal", "Hello"],
  //     meat: ["Ahmad", "Heba"],
  //     veggies: ["peppers", "Haaahhaa", "olives"]
  //   }
  // ];
  items;

  totalPrice = [];
  constructor(private cartService: CartService) { }

  ngOnInit() { 
    // this items will be an array of objects
    this.items = this.cartService.getItems();

    for (let item of this.items) {
      item.price += item.cheese.price + item.meat.price + item.veggies.price;
      this.totalPrice += item.price;
    }
  }

  clearCart() {
    this.items = [];
    this.cartService.clearCart();
  }

  deleteItem(index) {
    this.items.splice(index, 1);
  }
}