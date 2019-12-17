import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class VeggiesService {

  constructor(private http: HttpClient) { }

// Fetch veggies from the server
  getVeggiesToppings() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/veggies.json')
      .pipe(map(veggiesData => {
        const veggiesArray = [];
        for (const veggie in veggiesData ) {
          if (veggiesData.hasOwnProperty(veggie)) { // just to make sure we don't access some prototype property
            veggiesArray.push({...veggiesData[veggie], name: veggie});
          }
        }
        return veggiesArray;
      }));
  }

}