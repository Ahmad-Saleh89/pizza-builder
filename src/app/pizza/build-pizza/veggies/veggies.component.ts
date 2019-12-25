import { Component, OnInit, ViewChild } from '@angular/core';
import { PizzaService } from '../../../services/pizza.service';
import { VeggiesService } from '../../../services/veggies.service';

@Component({
  selector: 'app-veggies',
  templateUrl: './veggies.component.html',
  styleUrls: ['./veggies.component.css']
})
export class VeggiesComponent implements OnInit {

  veggies = [];

  selectedVeggies = [];

  constructor(private pizzaService: PizzaService, private veggiesService: VeggiesService) { }

  ngOnInit() { 
    this.fetchVeggiesToppings();
    this.selectedVeggies = this.veggiesService.getSelectedveggies();
  }

  fetchVeggiesToppings(): void {
   this.veggiesService.getVeggiesToppings()
      .subscribe(veggies => {
        this.veggies = veggies;
      });
  }

  selectVeggie(veggie) {
    this.pizzaService.selectTopping(veggie, this.selectedVeggies);

    // Send the created array to the service 
    // this.pizzaService.displayVeggiesData(this.selectedVeggies);

    this.pizzaService.sendVeggiesData(this.selectedVeggies);
  }
}