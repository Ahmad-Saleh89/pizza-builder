import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PizzaService } from '../../../services/pizza.service';

@Component({
  selector: 'app-cheese',
  templateUrl: './cheese.component.html',
  styleUrls: ['./cheese.component.css']
})
export class CheeseComponent implements OnInit {

  @ViewChild('cheeseForm', { static: false }) cheeseForm: NgForm;

  submitted = false;

  cheeseAmounts = ['Normal', 'Light', 'None'];
  cheeseToppings = ['Mozzarella', 'Parmesan', 'Cheddar'];
  // cheeseToppings = [
  //   {name:'Mozzarella', value:'1', checked:false},
  //   {name:'Parmesan', value:'2', checked:false},
  //   {name:'Cheddar', value:'3', checked:false}
  // ]

  cheeseAmount = '';
  cheeseTopping = [];

  // Store the chosen Size & Crust info in this array
  myCheese = [];

  constructor( private route: ActivatedRoute, private router: Router, private pizzaService: PizzaService) { }

  ngOnInit() {  }

  onSubmit() {
    this.submitted = true;
    this.cheeseAmount = this.cheeseForm.value.amount;
    this.cheeseTopping = this.cheeseForm.value.topping;

    console.log(this.cheeseTopping);

    // Clear the array, in case the user changed his mind
    this.myCheese = [];
    this.myCheese.push(this.cheeseAmount, this.cheeseTopping );

    // Send the created array to the service 
    this.pizzaService.displayCheeseData(this.myCheese);
 
    // Navigate to the next section
    this.router.navigate(['/pizza/build/meats']);
  }
}