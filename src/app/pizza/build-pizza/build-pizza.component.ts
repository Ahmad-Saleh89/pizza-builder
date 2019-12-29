import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// import { PreviousUrlService } from '../../services/previous-url.service';

import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';

// import { Sizecrust } from '../../interfaces/sizecrust';
// import { Cheese } from '../../interfaces/cheese';

@Component({
  selector: 'app-build-pizza',
  templateUrl: './build-pizza.component.html',
  styleUrls: ['./build-pizza.component.css']
})
export class BuildPizzaComponent implements OnInit {

  sizeCrustData = [];

  cheese$ = ["Normal"]; // observable
  cheeseToppings = []; // See notes below 

  meat$ = []; // observable
  veggies$ = []; // observable

  cart_modal = false;
  
  constructor(
    private pizzaService: PizzaService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    // First Approach
    this.pizzaService.sizecrust.subscribe(data => this.sizeCrustData = data);
    // Second Approach
    this.pizzaService.getMeatData().subscribe(data => this.meat$ = data);
    this.pizzaService.getVeggiesData().subscribe(data => this.veggies$ = data);    
    this.pizzaService.getCheeseData().subscribe((data) => {
      this.cheese$ = data;
      // Slice the cheese amount part from the array - leave the toppings only
      this.cheeseToppings = this.cheese$.slice(1, this.cheese$.length);
    });
    // console.log(this.previousUrlService.getPreviousUrl());
  }

  addToCart() {
    const toppings = [this.sizeCrustData, this.cheese$, this.meat$, this.veggies$];
    this.cartService.addToCart(toppings);
    this.showCartModal();
    setTimeout(() =>{
      this.startOver();
    },2000);
  }

  showCartModal() {
    this.cart_modal = true;
    setTimeout(() =>{
      this.cart_modal = false;
    },4000);
  }

  startOver() {
    // Default everything in this component
    this.sizeCrustData = ["Original", "Medium", "Normal", "BBQ"];
    this.cheese$ = ["Normal"];
    this.cheeseToppings = this.meat$ = this.veggies$ = [];
    // Start Over in Pizza Service
    this.pizzaService.startOver();
    this.router.navigate(["/pizza/build/size-crust"]);
  }

  // getPreviousUrl() {
  //   this.previousUrlService.getPreviousUrl();
  // }

}

// Notes:
/**
 * cheese$ array contains 2 different parts about cheese
 * The first part cheese$[0] will hold the cheese amount
 * The second part cheese$[1],[2],... will contain the OPTIONAL cheese toppings
 * cheese$ will look something like this: ['cheese amount', 'cheese toppings .....']
 * ['Normal', 'Mozzarella', 'Cheddar']
*/