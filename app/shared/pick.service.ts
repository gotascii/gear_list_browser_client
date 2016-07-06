import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class PickService {
  onCreate$: Subject<any>;
  created$: Observable<any>;

  constructor(@Inject('PICK_RESOURCE') private resource:JSData.DSResourceDefinition<any>) {
    this.onCreate$ = new Subject<any>();

    this.created$ = this.onCreate$.
      flatMap((pick) => {
        return this.resource.create(pick);
      }).share();
  }

  picks$(list) {
    return this.created$.
      startWith(true).
      flatMap((x, i) => {
        return [this.resource.filter({list_id: list.id})];
      }).
      map((picks) => {
        return picks.sort((a: any, b: any) => {
          // SOGGYCHOOCHOO
          let fa = a.item.function.name.toUpperCase();
          let fb = b.item.function.name.toUpperCase();
          if (fa < fb) { return -1; }
          if (fa > fb) { return 1; }
          return 0;
        });
      });
  }

  create(list: {}) {
    this.onCreate$.next(list);
  }
}

