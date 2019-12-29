import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../services/pizza.service';
import { CartService } from '../services/cart.service';

// import { Pizza } from '../interfaces/pizza';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  pizza = [];

  constructor(private pizzaService: PizzaService, private cartService: CartService) {}

  ngOnInit() {
    this.fetchPizza();
  }

  fetchPizza(): void {
   this.pizzaService.fetchPizza()
       .subscribe(pizza => {
          this.pizza = pizza;
       }); 
  }
  
  chooseSize(size) {
    console.log(size);
  }
  addToCart(item, size) {
    item.size = size;
    let price = item.minPrice;
    switch (item.size) {
      case 'Medium':
      price += 2;
      break;

      case 'Large':
      price += 4;
      break;

      default:
      price = item.minPrice;
    }
    item.singlePrice = price;
    item.price = parseFloat((price * item.quantity).toFixed(2));
    this.cartService.addToCart(item);
    // console.log(item);
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
- in this line: pizzaArray.push({...pizzaData[pizza], itemName: pizza}); first we're pushing the object properties and second we're pushing the object name itself "itemName"
- So the returned pizzaArray will contain an array of objects each one will look something like this:
  {image: "... Some Source ...", itemName: "Cheese Pizza",price: 12.99}
*/