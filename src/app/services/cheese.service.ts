import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Cheese } from '../classes/cheese';

@Injectable()
export class CheeseService {

  constructor(private http: HttpClient) { }


// Fetch Cheese data from the server
  fetchCheese() {
    return this.http.get<{ [cheese: string]: Cheese }>('https://pizzana-4b4ac.firebaseio.com/cheese.json')
      .pipe(map(cheeseData => {
        // const cheeseArray = [];
        // for (const cheese in cheeseData ) {
        //   cheeseArray.push({...cheeseArray[cheese]});
        // }
        // console.log(cheeseArray);
        // return cheeseArray;
        console.log(cheeseData.amount);
      }));
  }

}