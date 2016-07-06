import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { MaterializeDirective } from "angular2-materialize";
import { Title } from '@angular/platform-browser';

import { ItemFormComponent } from './item-form.component';
import { ItemCardComponent } from './item-card.component';
import { ItemService } from '../shared/item.service';
import { FunctionService } from '../shared/function.service';
import { MaterializeDropdownStream } from '../shared/materialize-dropdown-stream.directive';

@Component({
  selector: 'items',
  templateUrl: 'app/items/items.component.html',
  pipes: [UpperCasePipe],
  directives: [
    ItemFormComponent,
    ItemCardComponent,
    MaterializeDirective,
    MaterializeDropdownStream
  ]
})
export class ItemsComponent implements OnInit {
  items$: ReplaySubject<any>;
  onFilter$: Subject<any>;
  functions$: Observable<any>;
  page: number;
  pageSize: number;

  constructor(
    private titleService: Title,
    private itemService: ItemService,
    private functionService: FunctionService
  ) {
    this.page = 0;
    this.pageSize = 20;
  }

  ngOnInit() {
    this.functions$ = this.functionService.functions$;
    this.titleService.setTitle("My Gear");

    let filtered = this.itemService.filtered();

    this.items$ = filtered.stream$;
    this.onFilter$ = filtered.onFilter$;
    this.onLoadMore();
  }

  onFormSubmit(item) {
    this.itemService.create(item);
  }

  onDestroy(item) {
    this.itemService.destroy(item);
  }

  onLoadMore() {
    this.page += 1;
    this.onFilter$.next({
      limit: this.pageSize * this.page
    });
  }
}
