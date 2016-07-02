import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { MaterializeDropdownStream } from '../shared/materialize-dropdown-stream.directive';

@Component({
  selector: 'item-card',
  templateUrl: 'app/items/item-card.component.html',
  directives: [ MaterializeDropdownStream ]
})
export class ItemCardComponent {
  @Input() item: any;
}

