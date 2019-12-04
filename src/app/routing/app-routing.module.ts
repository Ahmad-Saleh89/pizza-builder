import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PizzaComponent } from '../pizza/pizza.component';
import { BuildPizzaComponent } from '../pizza/build-pizza/build-pizza.component';
import { SizeCrustComponent } from '../pizza/build-pizza/size-crust/size-crust.component';
import { CheeseComponent } from '../pizza/build-pizza/cheese/cheese.component';
import { MeatsComponent } from '../pizza/build-pizza/meats/meats.component';
import { VeggiesComponent } from '../pizza/build-pizza/veggies/veggies.component';
import { SidesComponent } from '../sides/sides.component';
import { DessertsComponent } from '../desserts/desserts.component';
import { DrinksComponent } from '../drinks/drinks.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/pizza', pathMatch: 'full' },
  { path: 'pizza', component: PizzaComponent },
  { 
    path: 'pizza/build', component: BuildPizzaComponent,
    children: [
      {path: 'size-crust', component: SizeCrustComponent },
      {path: 'cheese', component: CheeseComponent },
      {path: 'meats', component: MeatsComponent },
      {path: 'veggies', component: VeggiesComponent },
    ]
  },
  { path: 'sides', component: SidesComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
