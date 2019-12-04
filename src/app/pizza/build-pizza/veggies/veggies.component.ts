import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PizzaService } from '../../../services/pizza.service';

@Component({
  selector: 'app-veggies',
  templateUrl: './veggies.component.html',
  styleUrls: ['./veggies.component.css']
})
export class VeggiesComponent implements OnInit {

  veggies = [
    { name: 'Tomato', price: 0.5, image: 'https://grist.files.wordpress.com/2009/09/tomato.jpg', selected: false },
    { name: 'Pineapple', price: 0.5, image: 'https://grist.files.wordpress.com/2009/09/tomato.jpg', selected: false },
    { name: 'Onions', price: 0.5, image: 'https://grist.files.wordpress.com/2009/09/tomato.jpg', selected: false }
  ];

  selectedVeggies = [];

  constructor( private route: ActivatedRoute, private router: Router, private pizzaService: PizzaService) { }

  ngOnInit() {
  }

  selectVeggie(veggie) {
    /**
     * First check if the item is alreay selected
     * If "Yes" then delete item
     * If "Not" then push it to the selectedVeggies array
     */
    if(this.selectedVeggies.indexOf(veggie.name) !== -1){
      const index = this.selectedVeggies.indexOf(veggie.name);
      this.selectedVeggies.splice(index, 1);
      veggie.selected = false;
    }else{
      veggie.selected = true;
      this.selectedVeggies.push(veggie.name);
    }
  }

  finish() {
    // Send the created array to the service 
    this.pizzaService.displayVeggiesData(this.selectedVeggies);
  }
}