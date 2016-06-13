import { Injectable, Inject } from '@angular/core';

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
   * Ultimately, I thought it better to loose type safety here and constrain
   * data object interface specification to one place in the code base.
   */
  constructor(@Inject('ITEM_RESOURCE') private resource:JSData.DSResourceDefinition<any>) {
  }

  findAll() {
    return this.resource.findAll().then(items => {
      return items.sort((i1, i2) => {
        let fname1 = i1.function_name();
        let fname2 = i2.function_name();
        if (fname1 < fname2) { return -1; }
        if (fname1 > fname2) { return 1; }
        return 0;
      });
    });
  }
}

