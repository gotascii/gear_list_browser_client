import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ListService {
  onCreate$: Subject<any>;
  onDestroy$: Subject<any>;
  lists$: Observable<any>;

  constructor(@Inject('LIST_RESOURCE') private resource:JSData.DSResourceDefinition<any>) {
    this.onCreate$ = new Subject<any>();
    this.onDestroy$ = new Subject<any>();

    let created$ = this.onCreate$.
      flatMap((list) => {
        return this.resource.create(list);
      }).share();

    let destroyed$ = this.onDestroy$.
      flatMap((id) => {
        return this.resource.destroy(id);
      }).share();

    this.lists$ = Observable.merge(created$, destroyed$).
      startWith('init').
      flatMap((x, i) => {
        let lists = this.resource.filter({});
        if (lists.length == 0) {
          return this.resource.findAll();
        }
        return [lists];
      }).
      map((lists) => {
        return lists.sort((a: any, b: any) => {
          if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
      });
  }

  create(list: {}) {
    this.onCreate$.next(list);
  }

  destroy(id: number) {
    this.onDestroy$.next(id);
  }
}


