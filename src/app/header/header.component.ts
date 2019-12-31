import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  totalPrice: Number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.total.subscribe(price => this.totalPrice = price);
  }
}