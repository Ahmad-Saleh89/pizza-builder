import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class VeggiesService {

  veggiesArray = [];
  selectedVeggies = []

  constructor(private http: HttpClient) { }

// Fetch veggies from the server
  getVeggiesToppings() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/veggies.json')
      .pipe(map(veggiesData => {
        const veggies = [];
        for (const veggie in veggiesData ) {
          if (veggiesData.hasOwnProperty(veggie)) { // just to make sure we don't access some prototype property
            veggies.push({...veggiesData[veggie], name: veggie});
          }
        }
        if(this.veggiesArray.length !== veggies.length) {
          this.veggiesArray = veggies;
        }
        return this.veggiesArray;
      }));
  }

  getSelectedveggies() {
    return this.selectedVeggies;
  }

  startOver() {
    this.selectedVeggies = [];
    for (let veggie of this.veggiesArray) {
      if(veggie.selected) {
        veggie.selected = false;
      }
    }
  }
}