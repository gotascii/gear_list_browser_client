import { Component, OnInit } from '@angular/core';

import { FunctionService } from '../shared/function.service';

@Component({
  selector: 'functions',
  templateUrl: 'app/functions/functions.component.html'
})
export class FunctionsComponent implements OnInit {
  constructor(private functionService: FunctionService) { }

  title: 'Functions';
  functions: any[];

  ngOnInit() { this.getFunctions(); }

  getFunctions() {
    this.functions = [];
    this.functionService.findAll().then(functions => {
      this.functions = functions;
    });
  }
}
