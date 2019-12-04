import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PizzaService } from '../../../services/pizza.service';

@Component({
  selector: 'app-size-crust',
  templateUrl: './size-crust.component.html',
  styleUrls: ['./size-crust.component.css']
})
export class SizeCrustComponent implements OnInit {

  @ViewChild('size_crust', { static: false }) crustForm: NgForm;

  submitted = false;

  crustStyles = ['Original', 'Thin', 'Flatbread'];
  pizzaSizes = ['Small', 'Medium', 'Large'];
  pizzaCuts = ['Normal', 'Square', 'No Cut'];
  sauces = ['BBQ', 'Alfredo', 'Ranch', 'Buffalo'];

  crustStyle = '';
  pizzaSize = '';
  pizzaCut = '';
  sauce = '';

  // Store the chosen Size & Crust info in this array
  myPizza = [];

  constructor( private route: ActivatedRoute, private router: Router, private pizzaService: PizzaService) { }

  ngOnInit() {  }


  onSubmit() {
    this.submitted = true;
    this.crustStyle = this.crustForm.value.crust;
    this.pizzaSize = this.crustForm.value.size;
    this.pizzaCut = this.crustForm.value.cut;
    this.sauce = this.crustForm.value.sauce;

    // Clear the array, in case the user changed his mind
    this.myPizza = [];
    this.myPizza.push(this.crustStyle, this.pizzaSize, this.pizzaCut, this.sauce );

    // Send the created array to the service 
    this.pizzaService.displaySizeCrustData(this.myPizza);

    // Navigate to the next section
    this.router.navigate(['/pizza/build/cheese']);
  }
}