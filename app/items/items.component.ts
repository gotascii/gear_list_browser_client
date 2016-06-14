import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs/Rx';

import { ItemFormComponent } from './item-form.component';
import { ItemService } from '../shared/item.service';
import { FunctionService } from '../shared/function.service';

@Component({
  selector: 'items',
  templateUrl: 'app/items/items.component.html',
  pipes: [UpperCasePipe],
  directives: [ItemFormComponent]
})
export class ItemsComponent implements OnInit {
  constructor(
    private itemService: ItemService,
    private functionService: FunctionService
  ) { }

  title: 'Items';
  items$: Observable<any>;
  functions$: Observable<any>;

  ngOnInit() {
    this.items$ = this.itemService.items$;
    this.functions$ = this.functionService.functions$;
  }

  onFormSubmit(item) {
    this.itemService.create(item);
  }
}
