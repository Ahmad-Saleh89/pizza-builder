import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class MeatService {

  meatArray = [];
  selectedMeats = [];

  constructor(private http: HttpClient) { }

// Fetch meats from the server
  getMeatToppings() {
    return this.http.get<any>('https://pizzana-4b4ac.firebaseio.com/meats.json')
      .pipe(map(meatData => {
        const meats = []
        for (const meat in meatData ) {
          if (meatData.hasOwnProperty(meat)) { // just to make sure we don't access some prototype property
            meats.push({...meatData[meat], name: meat});
          }
        }
        if(this.meatArray.length !== meats.length) {
          this.meatArray = meats;
        }
        return this.meatArray;
      }));
  }

  getSelectedMeat() { 
    return this.selectedMeats;
  }

  startOver() {
    this.selectedMeats = [];
    for (let meat of this.meatArray) {
      if(meat.selected) {
        meat.selected = false;
      }
    }
  }
}