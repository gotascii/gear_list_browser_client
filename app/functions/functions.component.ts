import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Rx';

import { FunctionService } from '../shared/function.service';

@Component({
  selector: 'functions',
  templateUrl: 'app/functions/functions.component.html',
  pipes: [UpperCasePipe],
  directives: [ROUTER_DIRECTIVES]
})
export class FunctionsComponent implements OnInit {
  functions$: Observable<any>;

  constructor(private functionService: FunctionService) { }

  ngOnInit() {
    this.functions$ = this.functionService.functions$;
  }
}
