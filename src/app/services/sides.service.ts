import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class SidesService {

  constructor(private http: HttpClient) { }

// Fetch sides from the server
  getSides() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/sides.json')
      .pipe(map(sidesData => {
        const sides = []
        for (const side in sidesData ) {
          if (sidesData.hasOwnProperty(side)) { // just to make sure we don't access some prototype property
            sides.push({...sidesData[side], name: side, dipping: 'BBQ', quantity: 1});
          }
        }
        return sides;
      }));
  }

  getDipping() {
  return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/dipping.json')
    .pipe(map(dippingData => {
      const dippings = []
      for (const dipping in dippingData ) {
        if (dippingData.hasOwnProperty(dipping)) { // just to make sure we don't access some prototype property
          dippings.push(dipping);
        }
      }
      return dippings;
    }));
  }

}