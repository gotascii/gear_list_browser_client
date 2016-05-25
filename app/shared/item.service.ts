import { Injectable, Inject } from '@angular/core';

import { Item } from './item';

@Injectable()
export class ItemService {
  private resource: JSData.DSResourceDefinition<Item>;

  constructor(@Inject('DATASTORE') private store:JSData.DS) {
    this.store.defineResource({
      name: 'function',
      endpoint: 'functions'
    });

    this.resource = this.store.defineResource<Item>({
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
  }

  findAll() {
    return this.resource.findAll();
  }
}

