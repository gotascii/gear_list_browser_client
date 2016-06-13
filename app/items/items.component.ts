import { Component, OnInit } from '@angular/core';

import { ItemService } from '../shared/item.service';

@Component({
  selector: 'items',
  templateUrl: 'app/items/items.component.html'
})
export class ItemsComponent implements OnInit {
  constructor(private itemService: ItemService) { }

  title: 'Items';
  items: any[];

  ngOnInit() { this.getItems(); }

  getItems() {
    this.items = [];
    this.itemService.findAll().then(items => {
      this.items = items;
    });
  }
}
