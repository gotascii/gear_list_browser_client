import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class FunctionService {
  onFind$: Subject<any>;
  function$: Observable<any>;
  functions$: Observable<any>;

  constructor(@Inject('FUNCTION_RESOURCE') private resource:JSData.DSResourceDefinition<any>) {
    this.onFind$ = new Subject<any>();

    this.functions$ = (new Subject<any>()).
      startWith(true).
      flatMap((x, i) => {
        return this.resource.findAll();
      }).
      map((functions) => {
        return functions.sort((a: any, b: any) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
      });

    this.function$ = this.onFind$.
      flatMap((id) => {
        return this.resource.find(id);
      }).
      flatMap((func) => {
        // Functions that have only been loaded via findAll have an empty list
        // of items.
        let res = func[0] || func;
        if (res.items.length == 0) {
          return this.resource.find(res.id, { bypassCache: true });
        } else {
          return [res];
        }
      }).
      map((list) => {
        return list[0] || list;
      }).
      share();
  }

  find(id: number) {
    this.onFind$.next(id);
  }
}
