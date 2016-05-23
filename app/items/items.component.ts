import { Component, OnInit } from '@angular/core';

import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';
// import { GearListService } from '../shared/gear-list.service';

@Component({
  selector: 'items',
  templateUrl: 'app/items/items.component.html'
})
export class ItemsComponent implements OnInit {
  // constructor(private itemService: ItemService, private gearListService: GearListService) { }
  constructor(private itemService: ItemService) { }

  title: 'Items';
  items: Item[];

  ngOnInit() { this.getItems(); }

  getItems() {
    // this.gearListService.getItems();
debugger;
    this.itemService.getItems().then(items =>
      this.items = items
    );
  }
}
