import { Component, OnInit, ViewChild } from '@angular/core';
import { PizzaService } from '../../../services/pizza.service';

@Component({
  selector: 'app-meats',
  templateUrl: './meats.component.html',
  styleUrls: ['./meats.component.css']
})
export class MeatsComponent implements OnInit {

// This part should be fetched and updated in the DB 
// selected false or true should be updated in DB @@@@
  meats = [
    { name: 'Chicken', price: 1.5, image: 'https://www.fifteenspatulas.com/wp-content/uploads/2017/08/Mango-Cilantro-Coconut-Grilled-Chicken-Fifteen-Spatulas-1-640x427.jpg', selected: false },
    { name: 'Pepperoni', price: 1.4, image: 'https://media.istockphoto.com/photos/heap-of-pepperoni-picture-id169943249?k=6&m=169943249&s=612x612&w=0&h=uHY_zqmS3c4BYPaQZPr4cUlEgb4rcDdKa2Kra13Uxxg=', selected: false },
    { name: 'Beef', price: 2, image: 'https://opimedia.azureedge.net/-/media/images/men/editorial/articles/online-articles/2014/07-01/how-to-can-meat-strips-cubes-or-chunks/meat-cubes-jpg.jpg', selected: false },
    { name: 'Salami', price: 1.5, image: 'https://www.fifteenspatulas.com/wp-content/uploads/2017/08/Mango-Cilantro-Coconut-Grilled-Chicken-Fifteen-Spatulas-1-640x427.jpg', selected: false },
    { name: 'Bacon', price: 1.4, image: 'https://img1.exportersindia.com/product_images/bc-full/dir_21/608102/lamb-meat-1488358341-2739527.jpeg', selected: false },
    { name: 'Sausage', price: 2, image: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2014/9/22/0/WU0905_Spicy-Italian-Meatballs_s4x3.jpg.rend.hgtvcom.616.462.suffix/1415833742782.jpeg', selected: false }
  ];

  selectedMeats = [];

  constructor(private pizzaService: PizzaService) { }

  ngOnInit() { }

  selectMeat(meat) {
    this.pizzaService.selectTopping(meat, this.selectedMeats);
    // Send the created array to the service 
    // this.pizzaService.displayMeatData(this.selectedMeats);

    this.pizzaService.sendMeatData(this.selectedMeats);

  }
}