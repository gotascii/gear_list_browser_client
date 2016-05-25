import { Injectable, Inject } from '@angular/core';

@Injectable()
export class FunctionService {
  constructor(@Inject('DATASTORE') private store:JSData.DS) {
    this.store.defineResource({
      name: 'function',
      endpoint: 'functions'
    });
  }
}
