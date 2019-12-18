import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orderedPizza$ = [];

  constructor(private cartService: CartService) { }

  ngOnInit() { 
    this.cartService.getPizzaOrder().subscribe((pizza) => {
        this.orderedPizza$ = pizza;
        console.log(this.orderedPizza$); 
      });
  } 
}