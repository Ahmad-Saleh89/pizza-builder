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

  // Default [cruststyle,  size,     cut,    sauce]
  myPizza = ['Original', 'Medium', 'Normal', 'BBQ'];

  constructor( private route: ActivatedRoute, private router: Router, private pizzaService: PizzaService) { }

  ngOnInit() {  }

  // Update myPizza array on select
  onSelect(index, elem) {
    this.myPizza[index] = elem;
    // Send the created array to the service 
    this.pizzaService.updateSizeCrustData(this.myPizza);
  }
  onSubmit() {
    this.submitted = true;
    // Navigate to the next section
    this.router.navigate(['/pizza/build/cheese']);
  }
}