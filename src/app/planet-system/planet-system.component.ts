import { Component, OnInit } from '@angular/core';
import { Create3dPlanetsService } from "../create3d-planets.service";
import { PlanetService } from "../planet.service";
import { Planet } from "../planet";

@Component({
  selector: 'app-planet-system',
  templateUrl: './planet-system.component.html',
  styleUrls: ['./planet-system.component.css']
})
export class PlanetSystemComponent implements OnInit {
  private canEleId = 'renderCanvas';
  

  constructor(private mapServ: Create3dPlanetsService) {
    
  }

  ngOnInit() {
    this.mapServ.createScene(this.canEleId);
    this.mapServ.animate();
  }

}