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
  constructor(
    private titleService: Title,
    private itemService: ItemService,
    private functionService: FunctionService
  ) {}

  items$: ReplaySubject<any>;
  functions$: Observable<any>;

  ngOnInit() {
    this.items$ = this.itemService.items$();
    this.functions$ = this.functionService.functions$;
    this.titleService.setTitle("My Gear");
  }

  onFormSubmit(item) {
    this.itemService.create(item);
  }

  omg(){debugger;}
}
