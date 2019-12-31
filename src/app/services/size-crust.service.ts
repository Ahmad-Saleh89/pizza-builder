import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class SizeCrustService {

  // Default [cruststyle,  size,   cut,    sauce]
  pizza = ['Original', 'Medium', 'Normal', 'BBQ'];

  private sizeCrustSource = new BehaviorSubject(this.pizza);
  sizecrust = this.sizeCrustSource.asObservable();

  constructor() { }

  getSizeCrust() {
    return this.pizza;
  }

  selectSizeCrust(index, elem) {
    this.pizza[index] = elem;
  }

  startOver() {
    this.pizza = ['Original', 'Medium', 'Normal', 'BBQ'];
    
    // To default radio inputs in the size-crust component
    this.sizeCrustSource.next(this.pizza);
  }
}