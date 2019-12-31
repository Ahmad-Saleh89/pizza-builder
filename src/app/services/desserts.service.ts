import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DessertsService {

  constructor(private http: HttpClient) { }

// Fetch Desserts from the server
  getDesserts() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/desserts.json')
      .pipe(map(dessertsData => {
        const desserts = []
        for (const dessert in dessertsData ) {
          if (dessertsData.hasOwnProperty(dessert)) { // just to make sure we don't access some prototype property
            desserts.push({...dessertsData[dessert], name: dessert, quantity: 1});
          }
        }
        return desserts;
      }));
  }

}