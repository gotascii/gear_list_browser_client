import { Component, OnInit, OpaqueToken, provide } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import JSData from 'js-data';
import { JsonApiAdapter } from 'js-data-jsonapi';

import { ItemService } from './shared/item.service';
import { FunctionService } from './shared/function.service';
import { ItemsComponent } from './items/items.component';

const GEAR_LIST_DATASTORE_ADAPTER = new OpaqueToken('GEAR_LIST_DATASTORE_ADAPTER');

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
    provide(GEAR_LIST_DATASTORE_ADAPTER, {
      useValue: new JsonApiAdapter({ basePath: 'http://api.gear-list.com' })
    }),
    provide('DATASTORE', {
      useFactory: function(adapter:JSData.IDSAdapter) {
        let ds = new JSData.DS();
        ds.registerAdapter('GEAR_LIST_DATASTORE_ADAPTER', adapter, { default: true });
        return ds;
      },
      deps: [GEAR_LIST_DATASTORE_ADAPTER]
    }),
    ItemService,
    FunctionService
  ]
})

export class AppComponent implements OnInit {
  title: 'Gear List';

  ngOnInit() {
  }
}
