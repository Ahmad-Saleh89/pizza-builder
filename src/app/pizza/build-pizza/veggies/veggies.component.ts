import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() { }

  selectVeggie(veggie) {
    this.pizzaService.selectTopping(veggie, this.selectedVeggies);

    // Send the created array to the service 
    this.pizzaService.displayVeggiesData(this.selectedVeggies);
  }
}