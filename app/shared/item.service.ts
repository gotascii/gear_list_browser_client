import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ItemService {
  /*
   * <any> makes me sad, no doubt. The JSData typings indicate that findAll()
   * returns an array of objects that implement <T & DSInstanceShorthands<T>>.
   * However, in the JSes/at runtime this is not actually the case.
   *
   * Alterative 1: <Item> could be used. However, the object returned from
   * findAll() is based on a JSData-owned prototype and will not actually be an
   * Item complete with the methods defined in item.ts. Methods *can* be added
   * to the resource definition under the `methods` key, but mixing this with
   * <Item> can result in drift between the runtime interface and the Item
   * interface.
   *
   * Alternative 2: Item objects could be hydrated based on the JSData objects
   * returned from findAll(). When data model objects have complex relationship
   * graphs the logic for *how* to hydrate the graph will become complex.
   *
   * Ultimately, I thought it better to lose type safety here and constrain
   * data object interface specification to one place in the code base.
   */

  items$: Observable<any>;
  onCreate$: Subject<any>;
  findAllCalled: boolean;

  constructor(@Inject('ITEM_RESOURCE') private resource:JSData.DSResourceDefinition<any>) {
    this.findAllCalled = false;
    this.onCreate$ = new Subject<any>();

    let created$ = this.onCreate$.
      flatMap((item) => {
        return this.resource.create(item);
      }).share();

    this.items$ = created$.
      startWith(true).
      flatMap((x, i) => {
        if (this.findAllCalled) {
          return [this.resource.filter({})];
        } else {
          this.findAllCalled = true;
          return this.resource.findAll();
        }
      }).
      map((items) => {
        return items.sort((a: any, b: any) => {
          let fa = a.function.name.toUpperCase();
          let fb = b.function.name.toUpperCase();
          if (fa < fb) { return -1; }
          if (fa > fb) { return 1; }
          return 0;
        });
      });
  }

  create(item: {}) {
    this.onCreate$.next(item);
  }
}

