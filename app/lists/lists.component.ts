import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { MaterializeDirective } from "angular2-materialize";
import { Title } from '@angular/platform-browser';

import { ListFormComponent } from './list-form.component'
import { ListCardComponent } from './list-card.component'
import { ListService } from '../shared/list.service';
import { MaterializeDropdownStream } from '../shared/materialize-dropdown-stream.directive';

@Component({
  selector: 'lists',
  templateUrl: 'app/lists/lists.component.html',
  pipes: [UpperCasePipe],
  directives: [
    ListFormComponent,
    ListCardComponent,
    MaterializeDirective,
    MaterializeDropdownStream
  ]
})
export class ListsComponent implements OnInit {
  lists$: ReplaySubject<any>;

  constructor(
    private titleService: Title,
    private listService: ListService
  ) {
console.log('constru');
  }

  ngOnInit() {
console.log('init');
    this.titleService.setTitle("My Lists");
console.log('ts');
    this.lists$ = this.listService.lists$();
console.log('lists');
  }

  onFormSubmit(list) {
    this.listService.create(list);
  }

  onDeleteClick(id) {
    this.listService.destroy(id);
  }
}

