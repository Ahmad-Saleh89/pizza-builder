import { Component, OnInit } from '@angular/core';
import { SidesService } from '../services/sides.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-sides',
  templateUrl: './sides.component.html',
  styleUrls: ['./sides.component.css']
})
export class SidesComponent implements OnInit {

  sides = [];
  dippings = [];
  cart_modal = false;

  constructor(private sidesService: SidesService, private cartService: CartService) { }

  ngOnInit() {
    this.fetchSides();
    this.fetchDipping();
  }

  fetchSides(): void {
   this.sidesService.getSides()
      .subscribe(sides => {
        this.sides = sides;
      });
  }

  fetchDipping(): void {
   this.sidesService.getDipping()
      .subscribe(dippings => {
        this.dippings = dippings;
      });
  }

  addToCart(item) {
    item.price = parseFloat((item.singlePrice * item.quantity).toFixed(2));
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