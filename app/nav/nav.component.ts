import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { MaterializeDirective } from "angular2-materialize";
import { Title } from '@angular/platform-browser';

declare var $:any;

@Component({
  selector: 'nav',
  templateUrl: 'app/nav/nav.component.html',
  styles: [`
    .side-nav li,
    .side-nav a,
    .side-nav i {
      height: 46px;
      line-height: 46px;
    }

    .side-nav a {
      padding-left: 15px;
    }

    .side-nav i {
      margin-right: 35px;
      display: inline;
      width:22px;
    }
  `],
  directives: [ MaterializeDirective ]
})

export class NavComponent {

  constructor(private router: Router, private titleService: Title) { }

  onNav(route, title){
    this.titleService.setTitle(title);
    this.router.navigate(route);
    setTimeout(() => {
      $('.button-collapse').sideNav('hide');
    }, 50);
  }
}
