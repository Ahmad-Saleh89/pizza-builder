import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class CartService {

  pizzaSubject = new Subject<any[]>();

  constructor() { }

  // Send & Get Pizza Order
  sendPizzaOrder(data) {
    console.log("send");
    this.pizzaSubject.next(data);
  }
  getPizzaOrder(): Observable<any[]> {
    console.log("get");
    return this.pizzaSubject.asObservable();
  }

}