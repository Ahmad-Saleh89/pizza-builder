import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Pizza } from '../interfaces/pizza';

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

  constructor(private http: HttpClient) { }

// Display user selected options and toppings
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

// Fetch all pizza from the server
  fetchPizza() {
    return this.http.get<{ [pizza: string]: Pizza }>('https://pizzana-4b4ac.firebaseio.com/pizza.json')
      .pipe(map(pizzaData => {
        const pizzaArray = [];
        for (const pizza in pizzaData ) {
          if (pizzaData.hasOwnProperty(pizza)) { // just to make sure we don't access some prototype property
            pizzaArray.push({...pizzaData[pizza], pizzaName: pizza});
          }
        }
        return pizzaArray;
      }));
  }

  // In build your own pizza - select topping
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
      console.log(selectedToppings);
    }else{
      topping.selected = true;
      selectedToppings.push(topping.name);
    }
  }
}

// Look at this example:
// https://stackblitz.com/edit/angular-6-communicating-between-components-1gunkw?file=app%2Fapp.component.ts