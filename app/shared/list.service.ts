import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class ListService {
  onFind$: Subject<any>;
  onCreate$: Subject<any>;
  onDestroy$: Subject<any>;
  list$: Observable<any>;
  lists$: Observable<any>;
  findAllCalled: boolean;

  constructor(@Inject('LIST_RESOURCE') private resource:JSData.DSResourceDefinition<any>) {
    this.findAllCalled = false;
    this.onFind$ = new Subject<any>();
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
      startWith(true).
      flatMap((x, i) => {
      // findAll() caches the response and will always return the
      // cached response, even if additional resources are added to the
      // datastore. filter() will pull what is in the datastore. findAllCalled
      // keeps track of whether or not the datastore has ever had a full findAll
      // payload injected. This is mainly an issue when the app is booted off of
      // /lists/:id route.
        if (this.findAllCalled) {
          return [this.resource.filter({})];
        } else {
          this.findAllCalled = true;
          return this.resource.findAll();
        }
      }).
      map((lists) => {
        return lists.sort((a: any, b: any) => {
          if (a.name < b.name) { return -1; }
          if (a.name > b.name) { return 1; }
          return 0;
        });
      });

    this.list$ = this.onFind$.
      flatMap((id) => {
        return this.resource.find(id);
      }).
      flatMap((list) => {
        // loading lists only laded via findall results in empty lists.
        let res = list[0] || list;
        if (res.picks.length == 0) {
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

  create(list: {}) {
    this.onCreate$.next(list);
  }

  destroy(id: number) {
    this.onDestroy$.next(id);
  }
}


