import { Injectable, Inject } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';

@Injectable()
export class ListService {
  private onFind$: Subject<any>;
  private onCreate$: Subject<any>;
  private onDestroy$: Subject<any>;
  private onRefresh$: Subject<any>;

  list$: Observable<any>;
  private _lists$: ReplaySubject<any>;

  constructor(@Inject('LIST_RESOURCE') private resource:JSData.DSResourceDefinition<any>) {
    this.onCreate$ = new Subject<any>();
    this.onDestroy$ = new Subject<any>();
    this.onRefresh$ = new Subject<any>();
    this.onFind$ = new Subject<any>();

    let created$ = this.onCreate$.
      flatMap((list) => {
        return this.resource.create(list);
      }).share();

    let destroyed$ = this.onDestroy$.
      flatMap((id) => {
        return this.resource.destroy(id);
      }).share();

    let raw$ = Observable.merge(created$, destroyed$, this.onRefresh$).
      flatMap((x, i) => {
        return this.resource.findAll({}, {bypassCache: true});
      });

    let sorted$ = raw$.
      map((lists) => {
        let sorted = lists.sort((a: any, b: any) => {
          let an = a.name.toUpperCase();
          let bn = b.name.toUpperCase();
          if (an < bn) return -1;
          if (an > bn) return 1;
          return 0;
        });
        return sorted;
      });

    this._lists$ = new ReplaySubject(1);
    sorted$.subscribe(this._lists$);

    this.list$ = this.onFind$.
      flatMap((id) => {
        return this.resource.find(id);
      }).
      flatMap((list) => {
        // loading a list loaded via findall results in a list with no picks.
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

  lists$() {
    this.onRefresh$.next(true);
    return this._lists$;
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


