import { Component, OpaqueToken, provide } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import JSData from 'js-data';
import { JsonApiAdapter } from 'js-data-jsonapi';
import { MaterializeDirective } from "angular2-materialize";
import { Title } from '@angular/platform-browser';

import { ItemService } from './shared/item.service';
import { ListService } from './shared/list.service';
import { FunctionService } from './shared/function.service';
import { PickService } from './shared/pick.service';
import { ItemsComponent } from './items/items.component';
import { ListsComponent } from './lists/lists.component';
import { ListComponent } from './lists/list.component';
import { FunctionsComponent } from './functions/functions.component';
import { FunctionComponent } from './functions/function.component';
import { NavComponent } from './nav/nav.component';

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
    path: '/lists/:id',
    name: 'List',
    component: ListComponent
  },
  {
    path: '/functions',
    name: 'Functions',
    component: FunctionsComponent
  },
  {
    path: '/functions/:id',
    name: 'Function',
    component: FunctionComponent
  }
])
@Component({
  selector: 'gear-list',
  templateUrl: 'app/app.component.html',
  directives: [ ROUTER_DIRECTIVES, NavComponent ],
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
          endpoint: 'functions',
          relations: {
            hasMany: {
              item: {
                localField: 'items',
                foreignKey: 'function_id'
              }
            }
          }
        });

        ds.defineResource({
          name: 'list',
          endpoint: 'lists',
          relations: {
            hasMany: {
              pick: {
                localField: 'picks',
                foreignKey: 'list_id'
              }
            }
          }
        });

        ds.defineResource({
          name: 'pick',
          endpoint: 'picks',
          relations: {
            hasOne: {
              list: {
                localField: 'list',
                localKey: 'list_id'
              },
              item: {
                localField: 'item',
                localKey: 'item_id'
              }
            }
          }
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
    provide('PICK_RESOURCE', {
      useFactory: function(store:JSData.DS) { return store.definitions['pick'] },
      deps: [DATASTORE]
    }),
    ItemService,
    FunctionService,
    ListService,
    PickService
  ]
})

export class AppComponent { }
