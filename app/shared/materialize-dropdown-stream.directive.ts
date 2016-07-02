import { Directive, Input, DoCheck } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { isPresent } from '@angular/core/src/facade/lang';

declare var $:any;

@Directive({selector: '[materializeDropdownStream]'})
export class MaterializeDropdownStream implements DoCheck {
  materialized: boolean;
  subscribed: boolean;
  stream$: Observable<any>;

  constructor() {
    this.materialized = false;
    this.subscribed = false;
  }

  @Input() set materializeDropdownStream(stream$:Observable<any>) {
    this.stream$ = stream$;
  }

  ngDoCheck() {
    if(!this.subscribed && isPresent(this.stream$)) {
      this.stream$.subscribe((e) => {
        this.materialized = false;
      });
      this.subscribed = true;
      console.log('mater subscribed!');
    }

    if (!this.materialized && $('.dropdown-button').length > 0) {
      $('.dropdown-button').dropdown({});
      this.materialized = true;
      console.log('materialized!');
    }
  }
}

