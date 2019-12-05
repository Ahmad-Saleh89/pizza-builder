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
  // cheeseToppings = ['Mozzarella', 'Parmesan', 'Cheddar'];

  cheeseToppings = [
    { name: 'Mozzarella', price: 1.2, image: 'https://www.thespruceeats.com/thmb/q13nRIYKHXEEX99rB5118QT6c3s=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/Parmesan-cheese-GettyImages-117078872-5873ca725f9b584db3463216.jpg', selected: false },
    { name: 'Parmesan', price: 1.4, image: 'https://www.thespruceeats.com/thmb/q13nRIYKHXEEX99rB5118QT6c3s=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/Parmesan-cheese-GettyImages-117078872-5873ca725f9b584db3463216.jpg', selected: false },
    { name: 'Cheddar', price: 0.8, image: 'https://www.thespruceeats.com/thmb/q13nRIYKHXEEX99rB5118QT6c3s=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/Parmesan-cheese-GettyImages-117078872-5873ca725f9b584db3463216.jpg', selected: false }
  ];

  cheeseAmount = 'Normal';
  cheeseTopping = [];

  selectedToppings = [];

  // Store the chosen Cheese info in this array
  // The first element will be the cheese amount
  myCheese = ['Normal'];

  constructor( private route: ActivatedRoute, private router: Router, private pizzaService: PizzaService) { }

  ngOnInit() { }


  selectAmount(amount) {
    this.cheeseAmount = amount;
    this.myCheese[0] = amount;
    this.pizzaService.displayCheeseData(this.myCheese);
  }

  selectCheese(topping) {
    /**
     * First check if the item is alreay selected
     * If "Yes" then delete item
     * If "Not" then push it to the selectedToppings array
     */
    if(this.myCheese.indexOf(topping.name) !== -1){
      const index = this.myCheese.indexOf(topping.name);
      this.myCheese.splice(index, 1);
      topping.selected = false;
    }else{
      topping.selected = true;
      this.myCheese.push(topping.name);
    }
    this.pizzaService.displayCheeseData(this.myCheese);
  }

  onSubmit() {
    this.submitted = true;
    // this.cheeseAmount = this.cheeseForm.value.amount;
    // this.cheeseTopping = this.cheeseForm.value.topping;

    // Clear the array, in case the user changed his mind
    // this.myCheese = [];
    // this.myCheese.push(this.cheeseAmount, ...this.selectedToppings );

    // Send the created array to the service 
    // this.pizzaService.displayCheeseData(this.myCheese);
 
    // Navigate to the next section
    this.router.navigate(['/pizza/build/meats']);
  }
}