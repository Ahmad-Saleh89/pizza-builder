import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { PreviousUrlService } from '../../services/previous-url.service';

import { PizzaService } from '../../services/pizza.service';

// import { Sizecrust } from '../../interfaces/sizecrust';
// import { Cheese } from '../../interfaces/cheese';

@Component({
  selector: 'app-build-pizza',
  templateUrl: './build-pizza.component.html',
  styleUrls: ['./build-pizza.component.css']
})
export class BuildPizzaComponent implements OnInit {

  sizeCrustData = [];

  cheeseData = []; // See notes below
  cheeseToppings = [];

  meatData = [];

  veggiesData = [];


  constructor(private previousUrlService: PreviousUrlService, private pizzaService: PizzaService ) { }

  ngOnInit() {
    this.pizzaService.sizecrust.subscribe(data => this.sizeCrustData = data);
    this.pizzaService.cheese.subscribe((data) => {
      this.cheeseData = data;
      // Slice the cheese amount part from the array - leave the toppings only
      this.cheeseToppings = this.cheeseData.slice(1, this.cheeseData.length);
    }); 
    this.pizzaService.meat.subscribe(data => this.meatData = data);
    this.pizzaService.veggies.subscribe(data => this.veggiesData = data);
    
    console.log(this.previousUrlService.getPreviousUrl());
  }

  getPreviousUrl() {
    this.previousUrlService.getPreviousUrl();
  }

}

// Notes:
/**
 * cheeseData array contains 2 different parts about cheese
 * The first part cheeseData[0] will hold the cheese amount
 * The second part cheeseData[1],[2],... will contain the OPTIONAL cheese toppings
 * cheeseData will look something like this: ['cheese amount', 'cheese toppings .....']
 * ['Normal', 'Mozzarella', 'Cheddar']
*/