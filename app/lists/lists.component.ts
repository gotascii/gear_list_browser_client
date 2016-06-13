import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs/Rx';

import { ListFormComponent } from './list-form.component'
import { ListService } from '../shared/list.service';

@Component({
  selector: 'lists',
  templateUrl: 'app/lists/lists.component.html',
  pipes: [UpperCasePipe],
  directives: [ListFormComponent]
})
export class ListsComponent implements OnInit {
  title: 'Lists';
  lists$: Observable<any>;
  lists: Array<any>;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.lists = [{id:1, name:'hi'}];
    this.lists$ = this.listService.lists$;
  }

  onFormSubmit(list) {
    this.listService.create(list);
  }

  onDeleteClick(id) {
    this.listService.destroy(id);
  }
}

