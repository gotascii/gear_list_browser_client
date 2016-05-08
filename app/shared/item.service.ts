import { Injectable } from '@angular/core';
import JSData from 'js-data';
import DSHttpAdapter from 'js-data-http';

let store = new JSData.DS({basePath: 'http://45.79.85.21:3000/'});
store.registerAdapter('http', new DSHttpAdapter(), { default: true });
let User = store.defineResource('item');
console.log(store);
console.log(User);
let user = store.find('item', 1);

import { ITEMS } from './mock-items';

@Injectable()
export class ItemService {
  getItems() {
    return Promise.resolve(ITEMS);
  }
}
