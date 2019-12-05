import { Component, OnInit, ViewChild } from '@angular/core';
import { PizzaService } from '../../../services/pizza.service';

@Component({
  selector: 'app-meats',
  templateUrl: './meats.component.html',
  styleUrls: ['./meats.component.css']
})
export class MeatsComponent implements OnInit {

// This part should be fetched and updated in the DB 
// selected false or true should be updated in DB @@@@
  meats = [
    { name: 'Chicken', price: 1.5, image: 'https://www.fifteenspatulas.com/wp-content/uploads/2017/08/Mango-Cilantro-Coconut-Grilled-Chicken-Fifteen-Spatulas-1-640x427.jpg', selected: false },
    { name: 'Pepperoni', price: 1.4, image: 'https://www.fifteenspatulas.com/wp-content/uploads/2017/08/Mango-Cilantro-Coconut-Grilled-Chicken-Fifteen-Spatulas-1-640x427.jpg', selected: false },
    { name: 'Beef', price: 2, image: 'https://www.fifteenspatulas.com/wp-content/uploads/2017/08/Mango-Cilantro-Coconut-Grilled-Chicken-Fifteen-Spatulas-1-640x427.jpg', selected: false }
  ];

  selectedMeats = [];

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() { }

  selectMeat(meat) {
    /**
     * First check if the item is alreay selected
     * If "Yes" then delete item
     * If "Not" then push it to the selectedMeats array
     */
    if(this.selectedMeats.indexOf(meat.name) !== -1){
      const index = this.selectedMeats.indexOf(meat.name);
      this.selectedMeats.splice(index, 1);
      meat.selected = false;
    }else{
      meat.selected = true;
      this.selectedMeats.push(meat.name);
      // Send the created array to the service 
      this.pizzaService.displayMeatData(this.selectedMeats);
    }
  }
}