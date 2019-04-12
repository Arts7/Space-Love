import { Component, OnInit, Output } from '@angular/core';
import { PlanetService } from "../planet.service";
import { Planet } from "../planet";

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})

export class PlanetComponent implements OnInit {

  public planets: Planet[];

  constructor(private myService: PlanetService) {
    this.planets = [];

    this.myService.getPlanets().subscribe(
      (paramPlanets: Planet[]) => {
        this.planets = paramPlanets;
      }
    )
  }

  ngOnInit() {
  }

}
