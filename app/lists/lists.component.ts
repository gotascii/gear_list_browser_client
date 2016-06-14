import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Rx';

import { ListFormComponent } from './list-form.component'
import { ListService } from '../shared/list.service';

@Component({
  selector: 'lists',
  templateUrl: 'app/lists/lists.component.html',
  pipes: [UpperCasePipe],
  directives: [ROUTER_DIRECTIVES, ListFormComponent]
})
export class ListsComponent implements OnInit {
  lists$: Observable<any>;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.lists$ = this.listService.lists$;
  }

  onFormSubmit(list) {
    this.listService.create(list);
  }

  onDeleteClick(id) {
    this.listService.destroy(id);
  }
}

