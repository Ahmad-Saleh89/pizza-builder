import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Pizza } from '../interfaces/pizza';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  pizza: Pizza[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPizza();
  }

  private fetchPizza() {
    this.http.get<{ [pizza: string]: Pizza }>('https://pizzana-4b4ac.firebaseio.com/pizza.json')
        .pipe(map(pizzaData => {
          const pizzaArray = [];
          for (const pizza in pizzaData ) {
            if (pizzaData.hasOwnProperty(pizza)) { // just to make sure we don't access some prototype property
              pizzaArray.push({...pizzaData[pizza], pizzaName: pizza});
            }
          }
          return pizzaArray;
        }))
        .subscribe(pizza => {
          this.pizza = pizza; 
        });
  }
}

/* 
Basically when we get the pizza data from the server, it arrives as an ARRAY of OBJECTS, each object looks like this:
  Cheese Pizza: {
    image: "...image source ...."
    price: 12.99
  }
So, an array like this is a little hard to deal with and that's why we make use of pipe
- pipe(map()) is used to convert these objects into useful array (pizzaArray) so we can use easily 
- in this line: pizzaArray.push({...pizzaData[pizza], pizzaName: pizza}); first we're pushing the object properties and second we're pushing the object name itself "pizzaName"
- So the returned pizzaArray will contain an array of objects each one will look something like this:
  {image: "... Some Source ...", pizzaName: "Cheese Pizza",price: 12.99}
*/