import { Component, OnInit, OnChanges, SimpleChanges, Output, Input, OnDestroy, AfterViewChecked } from '@angular/core';
import { PlanetService } from "../planet.service";
import { Planet } from "../planet";
import { CreateOne3dPlanetService } from "../create-one-3d-planet.service";

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.css']
})

export class PlanetComponent implements OnInit, OnDestroy {

  public planetSearchIndex: number;
  public showWrap: boolean;

  get showWrapValue() {
    return this.showWrap;
  }

  set showWrapValue(showWrap) {
    this.showWrap = showWrap;
  }

  public planets: Planet[];
  private canEleId = 'renderCanvas';
  protected canvas: HTMLCanvasElement;

  constructor(private myService: PlanetService, private mapServ: CreateOne3dPlanetService) {
    this.planets = [];
    this.planetSearchIndex = 0;

  }

  // ngOnChanges(changes: SimpleChanges) {
  //   for (let propName in changes) {
  //     let chng = changes[propName];
  //     let cur = JSON.stringify(chng.currentValue);
  //     let prev = JSON.stringify(chng.previousValue);
  //     console.log("value of showWrap :" + cur);
  //     if (cur == "true") {
  //       this.showWrap = true;
  //     }

  //     this.showWrap = this.showWrap;
  //   }
  // }


  ngAfterViewChecked() {

    this.showWrap = this.showWrap;

  }


  ngOnInit() {
    this.myService.getPlanets().subscribe(
      (paramPlanets: Planet[]) => {
        this.planets = paramPlanets;
        
        this.mapServ.createScene(this.canEleId, this.planetSearchIndex);
        this.mapServ.animate();
        
        
        // this.canvas = <HTMLCanvasElement>document.getElementById(this.canEleId);
        // this.canvas.addEventListener("mousedown", this.mapServ.onDocumentMouseDown, false);
        // this.canvas.addEventListener("mousemove", this.mapServ.onDocumentMouseMove, false);

        this.showWrap = false;
      }
    );


  }

  public onPreviousPlanet(actualPlanetSearchIndex: number) {
    this.showWrap = true;
    console.log(this.showWrap);
    setTimeout(() => {
      if (actualPlanetSearchIndex <= 0) {
        this.planetSearchIndex = 23;
      } else {
        this.planetSearchIndex -= 1;
      }
      this.mapServ.changePlanet(this.planetSearchIndex);
      this.mapServ.animate();
    }, 3000);

    setTimeout(() => {
      this.showWrap = false;
    }, 5000);

  }

  public onNextPlanet(actualPlanetSearchIndex: number) {
    this.showWrap = true;
    console.log(this.showWrap);
    setTimeout(() => {
      if (actualPlanetSearchIndex >= 23) {
        this.planetSearchIndex = 0;
      } else {
        this.planetSearchIndex += 1;
      }
      this.mapServ.changePlanet(this.planetSearchIndex);
      this.mapServ.animate();
    }, 3000);

    setTimeout(() => {
      this.showWrap = false;
    }, 5000);
  }

  ngOnDestroy() {
    // this.canvas.removeEventListener("mousedown", this.mapServ.onDocumentMouseDown, false);
    // this.canvas.removeEventListener("mousemove", this.mapServ.onDocumentMouseMove, false);
  }
}
