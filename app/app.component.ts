import { Component, OnInit, OpaqueToken, provide } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import JSData from 'js-data';
import { JsonApiAdapter } from 'js-data-jsonapi';

import { ItemService } from './shared/item.service';
import { ListService } from './shared/list.service';
import { FunctionService } from './shared/function.service';
import { ItemsComponent } from './items/items.component';
import { ListsComponent } from './lists/lists.component';
import { FunctionsComponent } from './functions/functions.component';

const GEAR_LIST_DATASTORE_ADAPTER = new OpaqueToken('GEAR_LIST_DATASTORE_ADAPTER');
const DATASTORE = new OpaqueToken('DATASTORE');

@RouteConfig([
  {
    path: '/items',
    name: 'Items',
    component: ItemsComponent,
    useAsDefault: true
  },
  {
    path: '/lists',
    name: 'Lists',
    component: ListsComponent
  },
  {
    path: '/functions',
    name: 'Functions',
    component: FunctionsComponent
  }
])
@Component({
  selector: 'gear-list',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    provide(GEAR_LIST_DATASTORE_ADAPTER, {
      useValue: new JsonApiAdapter({ basePath: 'http://api.gear-list.com' })
    }),
    provide(DATASTORE, {
      useFactory: function(adapter:JSData.IDSAdapter) {
        let ds = new JSData.DS();
        ds.registerAdapter('GEAR_LIST_DATASTORE_ADAPTER', adapter, { default: true });

        ds.defineResource({
          name: 'function',
          endpoint: 'functions'
        });

        ds.defineResource({
          name: 'list',
          endpoint: 'lists'
        });

        ds.defineResource({
          name: 'item',
          endpoint: 'items',
          relations: {
            hasOne: {
              function: {
                localField: 'function',
                localKey: 'function_id'
              }
            }
          },
          methods: {
            function_name: function() {
              return this.function.name;
            }
          }
        });

        return ds;
      },
      deps: [GEAR_LIST_DATASTORE_ADAPTER]
    }),
    provide('ITEM_RESOURCE', {
      useFactory: function(store:JSData.DS) { return store.definitions['item'] },
      deps: [DATASTORE]
    }),
    provide('LIST_RESOURCE', {
      useFactory: function(store:JSData.DS) { return store.definitions['list'] },
      deps: [DATASTORE]
    }),
    provide('FUNCTION_RESOURCE', {
      useFactory: function(store:JSData.DS) { return store.definitions['function'] },
      deps: [DATASTORE]
    }),
    ItemService,
    FunctionService,
    ListService
  ]
})

export class AppComponent implements OnInit {
  title: 'Gear List';

  ngOnInit() {
  }
}
