import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Hero } from 'app/shared/hero';
import { HeroDetailComponent } from 'app/hero-detail/hero-detail.component';
import { HeroService } from 'app/shared/hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes/heroes.component.html',
  styleUrls:  ['app/heroes/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }

  title: 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;

  ngOnInit() { this.getHeroes(); }

  onSelect(hero: Hero) { this.selectedHero = hero; }

  getHeroes() {
    this.heroService.getHeroes().then(heroes =>
      this.heroes = heroes
    );
  }

  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
}


