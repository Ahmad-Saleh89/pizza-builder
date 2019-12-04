import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Sizecrust } from '../interfaces/sizecrust';
import { Cheese } from '../interfaces/cheese';

@Injectable()
export class PizzaService {

  sizeCrustData: Sizecrust[] = [];
  private sizeCrustSource = new BehaviorSubject(this.sizeCrustData);
  sizecrust = this.sizeCrustSource.asObservable();

  cheeseData: Cheese[] = [];
  private cheeseSource = new BehaviorSubject(this.cheeseData);
  cheese = this.cheeseSource.asObservable();

  meatData = [];
  private meatSource = new BehaviorSubject(this.meatData);
  meat = this.meatSource.asObservable();

  veggiesData = [];
  private veggiesSource = new BehaviorSubject(this.veggiesData);
  veggies = this.veggiesSource.asObservable();

  constructor() { }

  displaySizeCrustData(data) {
    this.sizeCrustSource.next(data);
  }

  displayCheeseData(data) {
    this.cheeseSource.next(data);
  }

  displayMeatData(data) {
    this.meatSource.next(data);
  }

  displayVeggiesData(data) {
    this.veggiesSource.next(data);
  }
}