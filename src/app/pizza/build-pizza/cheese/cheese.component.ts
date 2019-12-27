import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PizzaService } from '../../../services/pizza.service';
import { CheeseService } from '../../../services/cheese.service';

@Component({
  selector: 'app-cheese',
  templateUrl: './cheese.component.html',
  styleUrls: ['./cheese.component.css']
})
export class CheeseComponent implements OnInit {

  // @ViewChild('cheeseForm', { static: false }) cheeseForm: NgForm;

  cheeseAmounts = [];
  toppings = [];
  
  // Store the chosen Cheese info in this array
  // The first element will be the cheese amount - the rest will be the toppings
  myCheese = []; 

  constructor( private route: ActivatedRoute, private router: Router, private pizzaService: PizzaService, private cheeseService: CheeseService) { }

  ngOnInit() {
    this.fetchCheeseAmount();
    this.fetchCheeseToppings();
    this.myCheese = this.cheeseService.getSelectedCheese();
  }


  fetchCheeseAmount(): void {
   this.cheeseService.getCheeseAmounts()
      .subscribe(amounts => {
        this.cheeseAmounts = amounts;
      });
  }

  fetchCheeseToppings(): void {
   this.cheeseService.getCheeseToppings()
      .subscribe(toppings => {
        this.toppings = toppings;
      });
  }

  selectAmount(amount) {
    this.myCheese[0] = amount.amount;
    this.pizzaService.sendCheeseData(this.myCheese);
  }

  selectCheese(cheeseTopping) {
    this.pizzaService.selectTopping(cheeseTopping, this.myCheese);
    this.pizzaService.sendCheeseData(this.myCheese);
  }

  onSubmit() {
    this.router.navigate(['/pizza/build/meats']);
    this.pizzaService.sendCheeseData(this.myCheese);
  }
}