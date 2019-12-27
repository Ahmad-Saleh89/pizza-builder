import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../../../services/pizza.service';
import { MeatService } from '../../../services/meat.service';

@Component({
  selector: 'app-meats',
  templateUrl: './meats.component.html',
  styleUrls: ['./meats.component.css']
})
export class MeatsComponent implements OnInit {

  meats = [];

  selectedMeats = [];

  constructor(private pizzaService: PizzaService, private meatService: MeatService) { }

  ngOnInit() { 
    this.fetchMeatToppings();
    this.selectedMeats = this.meatService.getSelectedMeat();
  }

  fetchMeatToppings(): void {
   this.meatService.getMeatToppings()
      .subscribe(meats => {
        this.meats = meats;
      });
  }

  selectMeat(meat) {
    this.pizzaService.selectTopping(meat, this.selectedMeats);
    // Send the created array to the service  
    // this.pizzaService.displayMeatData(this.selectedMeats);

    this.pizzaService.sendMeatData(this.selectedMeats);
  }
} 