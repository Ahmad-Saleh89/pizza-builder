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
        // This logic here is to maintain the selected meat toppings if any. See Notes bellow
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

/**
 * Basically when the user comes back to the meat section after navigating away,
 * the selected toppings will be gone because the meats array will be refetched again from this service
 * To solve this:
 * (this.meatArray.length !== meats.length) this is true only the first time the meats are fetched from the DB
 * After that, the meatArray will be returned as is to the meats component no matter how many times
 * the getMeatToppings() function gets called
 */