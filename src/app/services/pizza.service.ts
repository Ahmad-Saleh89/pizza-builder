import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
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

  private cheeseSubject = new Subject<any[]>();
  private meatSubject = new Subject<any[]>();
  private veggiesSubject = new Subject<any[]>();

  private allToppings = [];

  constructor(private http: HttpClient) { }

// Display user selected options and toppings
  displaySizeCrustData(data) {
    this.sizeCrustSource.next(data);
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
    }else{
      topping.selected = true;
      selectedToppings.push(topping.name);
    }
  }

  // Send & Get Cheese Data
  sendCheeseData(data) {
    this.cheeseSubject.next(data);
  }
  getCheeseData(): Observable<any> {
    return this.cheeseSubject.asObservable();
  }

  // Send & Get Meat Data
  sendMeatData(data) {
    this.meatSubject.next(data);
  }
  getMeatData(): Observable<any> {
    return this.meatSubject.asObservable();
  }

  // Send & Get Veggies Data
  sendVeggiesData(data) {
    this.veggiesSubject.next(data);
  }
  getVeggiesData(): Observable<any> {
    return this.veggiesSubject.asObservable();
  }
}

// Look at this example:
// https://stackblitz.com/edit/angular-6-communicating-between-components-1gunkw?file=app%2Fapp.component.ts
// And this video https://www.youtube.com/watch?v=I317BhehZKM