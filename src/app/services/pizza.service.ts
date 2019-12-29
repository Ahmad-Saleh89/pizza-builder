import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { MeatService } from './meat.service';
import { CheeseService } from './cheese.service';
import { VeggiesService } from './veggies.service';
import { SizeCrustService } from './size-crust.service';

import { Pizza } from '../interfaces/pizza';

// import { Sizecrust } from '../interfaces/sizecrust';
// import { Cheese } from '../interfaces/cheese';

@Injectable()
export class PizzaService {

  // 2 different approaches are being used here: See Notes Below
  // First Approach using BehaviorSubject
  defaultSizeCrust = ["Original", "Medium", "Normal", "BBQ"];
  private sizeCrustSource = new BehaviorSubject(this.defaultSizeCrust);
  sizecrust = this.sizeCrustSource.asObservable();
  // Second Approach using Subject
  private cheeseSubject = new Subject<any[]>();
  private meatSubject = new Subject<any[]>();
  private veggiesSubject = new Subject<any[]>();

  constructor(
    private http: HttpClient,
    private meatService: MeatService,
    private cheeseService: CheeseService,
    private veggiesService: VeggiesService,
    private sizeCrustService: SizeCrustService
  ) { }

// Update user selected options
  updateSizeCrustData(data) {
    this.sizeCrustSource.next(data);
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

// Fetch all pizza from the server
  fetchPizza() {
    return this.http.get<{ [pizza: string]: Pizza }>('https://pizzana-4b4ac.firebaseio.com/pizza.json')
      .pipe(map(pizzaData => {
        const pizzaArray = [];
        for (const pizza in pizzaData ) {
          if (pizzaData.hasOwnProperty(pizza)) { // just to make sure we don't access some prototype property
            // Push objects to the pizzaArray
            pizzaArray.push({...pizzaData[pizza], pizzaName: pizza, quantity: 1});
          }
        }
        return pizzaArray;
      }));
  }

  // build your own pizza - select topping
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
    // console.log(selectedToppings);
  }

  startOver() {
    this.meatService.startOver();
    this.cheeseService.startOver();
    this.veggiesService.startOver();
    this.sizeCrustService.startOver();
    // This logic is important for the build-pizza component
    this.updateSizeCrustData(this.defaultSizeCrust);
  }
}


// NOTES: 2 different approaches are being used
/**
 * For (size & crust) I used the BehaviorSubject approach
 * sizecrust: Observable that will hold the default value initially ["Original", "Medium", "Normal", "BBQ"]
 * This value can be updated by the user from the size & crust component
 * The build-pizza component will then subscribe to the updated value coming from the service
 * 
 * --------------------------------------------
 * 
 * For Cheese - Meat - Veggies I used the Subject approach => 
 * The Meat Component for instance will SEND the selected meat toppings to the service
 * The build-pizza component will then GET the selected toppings from the service
 */





// Look at these examples:
// https://stackblitz.com/edit/angular-6-communicating-between-components-1gunkw?file=app%2Fapp.component.ts
// https://www.youtube.com/watch?v=oj6Tae2oSo0
// And this video https://www.youtube.com/watch?v=I317BhehZKM