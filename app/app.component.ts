import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

// import { HeroesComponent } from './heroes.component';
// import { HeroDetailComponent } from './hero-detail.component';
// import { DashboardComponent } from './dashboard.component';
// import { HeroService } from './hero.service';
// import { LittleTourComponent } from './little-tour.component';
import { ItemService } from './shared/item.service';
import { ItemsComponent } from './items/items.component';

@RouteConfig([
  {
    path: '/items',
    name: 'Items',
    component: ItemsComponent,
    useAsDefault: true
  },
  // {
  //   path: '/heroes',
  //   name: 'Heroes',
  //   component: HeroesComponent
  // },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: DashboardComponent,
  //   useAsDefault: true
  // },
  // {
  //   path: '/detail/:id',
  //   name: 'HeroDetail',
  //   component: HeroDetailComponent
  // },
  // {
  //   path: '/tour',
  //   name: 'LittleTour',
  //   component: LittleTourComponent
  // }
])

@Component({
  selector: 'gear-list',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Items']">Items</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    // HeroService,
    ItemService
  ]
})

export class AppComponent {
  title: 'Gear List';
}
