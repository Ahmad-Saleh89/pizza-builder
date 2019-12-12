import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  of } from 'rxjs';
import { Cheese } from '../classes/cheese';

@Injectable()
export class CheeseService {

  constructor(private http: HttpClient) { }


// Fetch Cheese data from the server
  // fetchCheese() {
  //   return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/cheese.json')
  //     .pipe(map(cheeseData => {
  //       const cheeseArray = [];
  //       for (const key in cheeseData ) {
  //         cheeseArray.push({...cheeseData[key]});
  //       }
  //       for (const key of cheeseArray){
  //         console.log(key);
  //       }
  //       return cheeseArray;
  //     }));
  // }

// Fetch Cheese Amounts data from the server
  getCheeseAmounts() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/cheese.json')
      .pipe(map(cheeseData => {
            const cheeseAmounts = [];
            for (const val in cheeseData.amount){
              cheeseAmounts.push([val, cheeseData.amount[val].selected]);
            }
        return cheeseAmounts;
      }));
  }

  getCheeseToppings() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/cheese.json')
      .pipe(map(cheeseData => {
            const toppings = [];
            for (const val in cheeseData.toppings){
              toppings.push([val,cheeseData.toppings[val].image, cheeseData.toppings[val].selected]);
            }
        return toppings;
      }));
  }

}

