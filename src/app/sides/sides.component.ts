import { Component, OnInit } from '@angular/core';
import { SidesService } from '../services/sides.service';

@Component({
  selector: 'app-sides',
  templateUrl: './sides.component.html',
  styleUrls: ['./sides.component.css']
})
export class SidesComponent implements OnInit {

  sides = [];

  constructor(private sidesService: SidesService) { }

  ngOnInit() {
    this.fetchSides();
  }

  fetchSides(): void {
   this.sidesService.getSides()
      .subscribe(sides => {
        this.sides = sides;
        console.log(sides);
      });
  }
}