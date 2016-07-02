import { Component, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Rx';

import { MaterializeDropdownStream } from '../shared/materialize-dropdown-stream.directive';

@Component({
  selector: 'list-card',
  templateUrl: 'app/lists/list-card.component.html',
  directives: [ MaterializeDropdownStream ]
})
export class ListCardComponent {
  @Input() list: any;

  constructor(private router: Router) {}

  onCardClick(list) {
    this.router.navigate(['List', {id: list.id}]);
  }

  stop($event) {
    $event.stopPropagation();
  }
}


