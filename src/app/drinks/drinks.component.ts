import { Component, OnInit } from '@angular/core';
import { DrinksService } from '../services/drinks.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {

  drinks = [];
  cart_modal = false;

  constructor(private drinksService: DrinksService, private cartService: CartService) { }

  ngOnInit() {
    this.fetchDrinks();
  }

  fetchDrinks(): void {
   this.drinksService.getDrinks()
      .subscribe(drinks => {
        this.drinks = drinks;
      });
  }

  addToCart(item) {
    item.price = parseFloat((item.singlePrice * item.quantity).toFixed(2));
    if(item.size == '2-Liter'){
      item.price += 0.70;
    }
    this.cartService.addToCart(item);
    this.showCartModal();
  }

  showCartModal() {
    this.cart_modal = true;
    setTimeout(() =>{
      this.cart_modal = false;
    },2000);
  }

}