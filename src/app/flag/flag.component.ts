import { Component, OnInit, OnChanges, Input, SimpleChanges, ComponentFactoryResolver } from '@angular/core';
import { Planet } from "../planet";
import { PlanetService } from "../planet.service";


@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {

  @Input() public planetID: number;

  public planets: Planet[] = [];
  public planet: Planet = new Planet();


  constructor(private myService: PlanetService) {
    this.planet = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let chng = changes[propName];
      let cur = JSON.stringify(chng.currentValue);
      let prev = JSON.stringify(chng.previousValue);
      this.planetID = Number(cur);
      this.planet = this.planets[this.planetID];
    }
  }

  ngOnInit() {
    this.myService.getPlanets().subscribe(
      (param_planets: Planet[]) => {
        for (let i: number = 0; i < 24; i++) {
          this.planets.push(param_planets[Math.floor((Math.random() * param_planets.length))]);
        }
        this.planet = this.planets[this.planetID];
      }
    );
  }
}
