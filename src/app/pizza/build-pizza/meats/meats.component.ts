import { Component, OnInit, ViewChild } from '@angular/core';
import { PizzaService } from '../../../services/pizza.service';
import { MeatService } from '../../../services/meat.service';

@Component({
  selector: 'app-meats',
  templateUrl: './meats.component.html',
  styleUrls: ['./meats.component.css']
})
export class MeatsComponent implements OnInit {

// This part should be fetched and updated in the DB 
// selected false or true should be updated in DB @@@@
  meats = [];

  selectedMeats = [];

  constructor(private pizzaService: PizzaService, private meatService: MeatService) { }

  ngOnInit() { 
    this.fetchMeatToppings();
  }

  fetchMeatToppings(): void {
   this.meatService.getMeatToppings()
      .subscribe(meats => {
        this.meats = meats;
        console.log(meats)
      });
  }

  selectMeat(meat) {
    this.pizzaService.selectTopping(meat, this.selectedMeats);
    // Send the created array to the service 
    // this.pizzaService.displayMeatData(this.selectedMeats);

    this.pizzaService.sendMeatData(this.selectedMeats);

  }
}