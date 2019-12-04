import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PizzaComponent } from './pizza/pizza.component';
import { SidesComponent } from './sides/sides.component';
import { DessertsComponent } from './desserts/desserts.component';
import { DrinksComponent } from './drinks/drinks.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BuildPizzaComponent } from './pizza/build-pizza/build-pizza.component';
import { SizeCrustComponent } from './pizza/build-pizza/size-crust/size-crust.component';
import { CheeseComponent } from './pizza/build-pizza/cheese/cheese.component';
import { MeatsComponent } from './pizza/build-pizza/meats/meats.component';
import { VeggiesComponent } from './pizza/build-pizza/veggies/veggies.component';
import { PreviousUrlService } from './services/previous-url.service';
import { PizzaService } from './services/pizza.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, HttpClientModule ],
  declarations: [ AppComponent, HeaderComponent, PizzaComponent, SidesComponent, DessertsComponent, DrinksComponent, PageNotFoundComponent, BuildPizzaComponent, SizeCrustComponent, CheeseComponent, MeatsComponent, VeggiesComponent ],
  bootstrap:    [ AppComponent ],
  providers: [PreviousUrlService, PizzaService]
})
export class AppModule { }
