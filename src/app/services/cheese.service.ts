import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Cheese } from '../classes/cheese';

@Injectable()
export class CheeseService {

  constructor(private http: HttpClient) { }

// Fetch Cheese Amounts data from the server
  getCheeseAmounts() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/cheese.json')
      .pipe(map(cheeseData => {
            const cheeseAmounts = [];
            for (const val in cheeseData.amounts){
              cheeseAmounts.push(cheeseData.amounts[val]);
            }
        return cheeseAmounts;
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
        return toppings;
      }));
  }

}
