import { Component, Input } from '@angular/core';

@Component({
  selector: 'tr[item]',
  templateUrl: 'app/items/item-row.component.html'
})
export class ItemRowComponent {
  @Input() item: any;
}

