import { Component, OnInit } from '@angular/core';

import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';

@Component({
  selector: 'items',
  templateUrl: 'app/items/items.component.html'
})
export class ItemsComponent implements OnInit {
  constructor(private itemService: ItemService) { }

  title: 'Items';
  items: Item[];

  ngOnInit() { this.getItems(); }

  getItems() {
    this.itemService.getItems().then(items =>
      this.items = items
    );
  }
}
