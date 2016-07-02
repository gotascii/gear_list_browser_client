import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { RouteParams, Router } from '@angular/router-deprecated';
import { Title } from '@angular/platform-browser';

import { FunctionService } from '../shared/function.service';

@Component({
  selector: 'function',
  templateUrl: 'app/functions/function.component.html',
  pipes: [UpperCasePipe]
})
export class FunctionComponent implements OnInit {
  public func;

  constructor(
    private titleService: Title,
    private routeParams:RouteParams,
    private functionService: FunctionService
  ) { }

  ngOnInit() {
    let id = +this.routeParams.get('id');

    this.functionService.function$.subscribe((func) => {
      this.func = func;
      this.titleService.setTitle(func.name);
    });

    this.functionService.find(id);
  }
}



