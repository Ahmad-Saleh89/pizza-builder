import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Cheese } from '../classes/cheese';

@Injectable()
export class CheeseService {

  cheeseAmounts = [];
  cheeseArray = [];
  selectedCheese = ["normal"];

  constructor(private http: HttpClient) { }

// Fetch Cheese Amounts data from the server
  getCheeseAmounts() {
     return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/cheese.json')
      .pipe(map(cheeseData => {
            this.cheeseAmounts = [];
            for (const val in cheeseData.amounts){
              this.cheeseAmounts.push({
                amount: val,
                selected: cheeseData.amounts[val].selected});
            }
        return this.cheeseAmounts;
      }));
  }

// Fetch Cheese Toppings data from the server
  getCheeseToppings() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/cheese.json')
      .pipe(map(cheeseData => {
            const toppings = [];
            for (const val in cheeseData.toppings){
              // toppings.push([val, cheeseData.toppings[val].image, cheeseData.toppings[val].price]);
              toppings.push({
                name: val, 
                image: cheeseData.toppings[val].image, 
                price: cheeseData.toppings[val].price,
                selected: false
                });
            }
        if(this.cheeseArray.length !== toppings.length) {
          this.cheeseArray = toppings;
        }
        return this.cheeseArray;
      }));
  }

  getSelectedCheese() {
    return this.selectedCheese;
  }

  startOver() {
    this.selectedCheese = ["normal"];
    for (let cheese of this.cheeseArray) {
      if(cheese.selected) {
        cheese.selected = false;
      }
    }
  }
}


/**
 * Basically when the user comes back to the cheese section after navigating away,
 * the selected toppings will be gone because the cheese array will be refetched again from this service
 * To solve this:
 * (this.cheeseArray.length !== toppings.length) this is true only the first time the cheese are fetched from the DB
 * After that, the cheeseArray will be returned as is to the cheese component no matter how many times
 * the getCheeseToppings() function gets called
 */