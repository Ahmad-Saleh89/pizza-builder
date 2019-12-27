import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PizzaService } from '../../../services/pizza.service';
import { SizeCrustService } from '../../../services/size-crust.service';

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

  myPizza = [];  // Default [cruststyle, size, cut, sauce]


  constructor( 
    private route: ActivatedRoute, 
    private router: Router, 
    private pizzaService: PizzaService,
    private sizeCrustService: SizeCrustService
    ) { }

  ngOnInit() {
    this.sizeCrustService.sizecrust.subscribe(data => this.myPizza = data);
  }

  // Update myPizza array on select
  onSelect(index, elem) {
    this.sizeCrustService.selectSizeCrust(index, elem);
    // Send the created array to the service 
    this.pizzaService.updateSizeCrustData(this.myPizza);
  }
  onSubmit() {
    this.submitted = true;
    // Navigate to the next section
    this.router.navigate(['/pizza/build/cheese']);
  }
}