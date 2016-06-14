import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { RouteParams, Router } from '@angular/router-deprecated';

import { ListService } from '../shared/list.service';
import { PickService } from '../shared/pick.service';
import { ItemService } from '../shared/item.service';
import { PickFormComponent } from '../picks/pick-form.component';

@Component({
  selector: 'list',
  templateUrl: 'app/lists/list.component.html',
  pipes: [UpperCasePipe],
  directives: [PickFormComponent]
})
export class ListComponent implements OnInit {
  picks$: Observable<any>;
  items$: Observable<any>;
  public list;

  constructor(
    private routeParams:RouteParams,
    private listService: ListService,
    private itemService: ItemService,
    private pickService: PickService
  ) { }

  ngOnInit() {
    let id = +this.routeParams.get('id');

    this.listService.list$.subscribe((list) => {
      this.list = list;
      this.picks$ = this.pickService.picks$(list);
    });

    this.listService.find(id);
    this.items$ = this.itemService.items$;
  }

  onFormSubmit(pick) {
    pick.listId = this.list.id;
    this.pickService.create(pick);
  }
}


