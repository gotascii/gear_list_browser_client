import { Injectable, Inject } from '@angular/core';

@Injectable()
export class FunctionService {
  constructor(@Inject('FUNCTION_RESOURCE') private resource:JSData.DSResourceDefinition<any>) {
  }

  findAll() {
    return this.resource.findAll();
  }
}
