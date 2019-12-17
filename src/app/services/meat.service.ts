import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class MeatService {

  constructor(private http: HttpClient) { }

// Fetch meats from the server
  getMeatToppings() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/meats.json')
      .pipe(map(meatData => {
        const meatArray = [];
        for (const meat in meatData ) {
          if (meatData.hasOwnProperty(meat)) { // just to make sure we don't access some prototype property
            meatArray.push({...meatData[meat], name: meat});
          }
        }
        return meatArray;
      }));
  }

}