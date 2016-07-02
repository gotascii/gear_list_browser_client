import { Component, Input } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Rx';

import { MaterializeDropdownStream } from '../shared/materialize-dropdown-stream.directive';

@Component({
  selector: 'function-card',
  templateUrl: 'app/functions/function-card.component.html',
  directives: [ MaterializeDropdownStream ]
})
export class FunctionCardComponent {
  @Input() func: any;

  constructor(private router: Router) {}

  onCardClick(func) {
    this.router.navigate(['Function', {id: func.id}]);
  }

  stop($event) {
    $event.stopPropagation();
  }
}



