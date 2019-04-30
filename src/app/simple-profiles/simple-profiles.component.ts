import { Component, OnInit } from '@angular/core';
import { PersonProfilesService } from '../person-profiles.service';
import { Person } from '../person';
import { Router } from '@angular/router';
import { CarouselProfileService } from '../carousel-profile.service';
import { profilsMatch } from "../critere";
import { planetProfil } from "../critere";
import { PlanetService } from "../planet.service";
import { Planet } from "../planet";

@Component({
  selector: 'app-simple-profiles',
  templateUrl: './simple-profiles.component.html',
  styleUrls: ['./simple-profiles.component.css']
})
export class SimpleProfilesComponent implements OnInit {

  public updateRotation: boolean;
  public carousel: any;
  public currdeg: number;
  public nextButton: any;
  public prevButton: any;
  public profils: Person[];
  public planet: Planet[];

  constructor(private myplanetService: PlanetService, private myService: PersonProfilesService) {
    
    this.updateRotation = false;
    // this.carousel = document.querySelector(".carouselSlide");
    this.currdeg = 0;
    // this.nextButton = document.querySelector(".next");
    // this.prevButton = document.querySelector(".prev");
    this.planet = [];
    this.profils = [];

    // this.myService.getProfils().subscribe(
    //   (param_profils:Person[]) => {
    //     this.profils = param_profils;
    //   }
    // )
    this.planet = planetProfil;
    console.log("Voici la planète à afficher :", this.planet[0]);
    if (profilsMatch.length > 3){
      for (let i: number = 0; i < 3; i++) {
        this.profils.push(profilsMatch[i]);
      }
    } else {
      this.profils = profilsMatch;
    }
    console.log("Voici les profils :",this.profils)
   }


  ngOnInit() { 
  //   this.myService.getProfils().subscribe(
  //     (param_profils: Person[]) => {
  //       this.profils = param_profils;
  //     }
  //     );  

  // this.myplanetService.getPlanets().subscribe(
  //   (paramPlanets: Planet[]) => {
  //     this.planets = paramPlanets;
  //   }
  // );
  }

  rotate(e: string): void {
    if (e == "n") {
      this.currdeg = this.currdeg - 120;
    }
    if (e == "p") {
      this.currdeg = this.currdeg + 120;
    }
    this.updateRotation = true;
    let item1 = document.querySelector('*[data-index="0"]').parentNode as HTMLElement;
    let item2 = document.querySelector('*[data-index="1"]').parentNode as HTMLElement;
    let item3 = document.querySelector('*[data-index="2"]').parentNode as HTMLElement;

    

    item1.style.zIndex = "100";
    item2.style.zIndex = "100";
    item3.style.zIndex = "100";



    let val = Math.abs(this.currdeg) % 360;

    if (val == 0){
      item3.style.zIndex = "200";
    }

    if (val == 120){
      item2.style.zIndex = "200";
    }

    if (val == 240){
      item1.style.zIndex = "200";
    }


  }

  rotationSlide() {
    return "rotateY(" + this.currdeg.toString() + "deg)";

  }
}
