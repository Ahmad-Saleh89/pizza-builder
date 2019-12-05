import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// import { Sizecrust } from '../interfaces/sizecrust';
// import { Cheese } from '../interfaces/cheese';

@Injectable()
export class PizzaService {

  sizeCrustData = [];
  private sizeCrustSource = new BehaviorSubject(this.sizeCrustData);
  sizecrust = this.sizeCrustSource.asObservable();

  cheeseData = [];
  private cheeseSource = new BehaviorSubject(this.cheeseData);
  cheese = this.cheeseSource.asObservable();

  meatData = [];
  private meatSource = new BehaviorSubject(this.meatData);
  meat = this.meatSource.asObservable();

  veggiesData = [];
  private veggiesSource = new BehaviorSubject(this.veggiesData);
  veggies = this.veggiesSource.asObservable();

  constructor() { }

  displaySizeCrustData(data) {
    this.sizeCrustSource.next(data);
  }

  displayCheeseData(data) {
    this.cheeseSource.next(data);
  }

  displayMeatData(data) {
    this.meatSource.next(data);
  }

  displayVeggiesData(data) {
    this.veggiesSource.next(data);
  }

  selectTopping(topping, selectedToppings) {
    /**
     * First check if the item is alreay selected
     * If "Yes" then delete item
     * If "Not" then push it to the selectedToppings array
     */
    if(selectedToppings.indexOf(topping.name) !== -1){
      const index = selectedToppings.indexOf(topping.name);
      selectedToppings.splice(index, 1);
      topping.selected = false;
    }else{
      topping.selected = true;
      selectedToppings.push(topping.name);
    }
  }
}