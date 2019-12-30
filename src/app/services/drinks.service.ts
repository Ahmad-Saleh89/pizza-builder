import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DrinksService {

  constructor(private http: HttpClient) { }

// Fetch drinks from the server
  getDrinks() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/drinks.json')
      .pipe(map(drinksData => {
        const drinks = []
        for (const drink in drinksData ) {
          if (drinksData.hasOwnProperty(drink)) { // just to make sure we don't access some prototype property
            drinks.push({...drinksData[drink], drink: drink, size: '20 oz', quantity: 1});
          }
        }
        return drinks;
      }));
  }
}