import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { Observable } from 'rxjs/Rx';
import { Title } from '@angular/platform-browser';

import { FunctionService } from '../shared/function.service';
import { FunctionCardComponent } from './function-card.component';

@Component({
  selector: 'functions',
  templateUrl: 'app/functions/functions.component.html',
  pipes: [UpperCasePipe],
  directives: [ROUTER_DIRECTIVES, FunctionCardComponent]
})
export class FunctionsComponent implements OnInit {
  functions$: Observable<any>;

  constructor(
    private titleService: Title,
    private functionService: FunctionService
  ) { }

  ngOnInit() {
    this.functions$ = this.functionService.functions$;
    this.titleService.setTitle("My Categories");
  }
}
