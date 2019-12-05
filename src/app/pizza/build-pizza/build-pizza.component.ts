import { Component, OnInit, AfterContentChecked } from '@angular/core';

import { PreviousUrlService } from '../../services/previous-url.service';

import { PizzaService } from '../../services/pizza.service';

import { Sizecrust } from '../../interfaces/sizecrust';
import { Cheese } from '../../interfaces/cheese';

@Component({
  selector: 'app-build-pizza',
  templateUrl: './build-pizza.component.html',
  styleUrls: ['./build-pizza.component.css']
})
export class BuildPizzaComponent implements OnInit {

  sizeCrustData: Sizecrust[] = [];

  cheeseData: Cheese[] = [];

  meatData = [];

  veggiesData = [];

  toppings = [];

  // Optional Cheese Topping
  cheeseTopping: number = 0;

  constructor(private previousUrlService: PreviousUrlService, private pizzaService: PizzaService ) { }

  ngOnInit() {
    this.pizzaService.sizecrust.subscribe(data => this.sizeCrustData = data);
    this.pizzaService.cheese.subscribe((data) => {
      this.cheeseData = data;
      this.toppings = this.cheeseData.slice(1, this.cheeseData.length);
    }); 
    this.pizzaService.meat.subscribe(data => this.meatData = data);
    this.pizzaService.veggies.subscribe(data => this.veggiesData = data);
    
    console.log(this.previousUrlService.getPreviousUrl());
  }

  getPreviousUrl() {
    this.previousUrlService.getPreviousUrl();
  }

}