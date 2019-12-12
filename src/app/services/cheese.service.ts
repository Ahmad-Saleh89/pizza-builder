import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {  of } from 'rxjs';
import { Cheese } from '../classes/cheese';

@Injectable()
export class CheeseService {

  constructor(private http: HttpClient) { }

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

// Update Cheese Amount
updateCheeseAmount(){
   return this.http.put("https://pizzana-4b4ac.firebaseio.com/cheese.json", 
   {
     "amount": {
       "light": {
         "selected": true
       }
       
     }
   }).pipe();
}


// Fetch Cheese Toppings data from the server
  getCheeseToppings() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/cheese.json')
      .pipe(map(cheeseData => {
            const toppings = [];
            for (const val in cheeseData.toppings){
              toppings.push([val, cheeseData.toppings[val].image, cheeseData.toppings[val].selected]);
            }
        return toppings;
      }));
  }



 httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
 };


}

