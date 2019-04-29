import { Component, OnInit } from '@angular/core';
import { PersonProfilesService } from '../person-profiles.service';
import { Person } from '../person';
import { Router } from '@angular/router';
import { CarouselProfileService } from '../carousel-profile.service';

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

  constructor(private myService: PersonProfilesService) {

    this.updateRotation = false;
    // this.carousel = document.querySelector(".carouselSlide");
    this.currdeg = 0;
    // this.nextButton = document.querySelector(".next");
    // this.prevButton = document.querySelector(".prev");

    this.profils = [];

    this.myService.getProfils().subscribe(
      (param_profils: Person[]) => {
        this.profils = param_profils;
      }
    )
  }

  ngOnInit() {
  }


  rotate(e: string): void {
    if (e == "n") {
      this.currdeg = this.currdeg - 120;
    }
    if (e == "p") {
      this.currdeg = this.currdeg + 120;
    }
    this.updateRotation = true;
    let item1 = document.querySelector(".arfgrugnugnu").parentNode as HTMLElement;
    let item2 = document.querySelector(".golsurg").parentNode as HTMLElement;
    let item3 = document.querySelector(".boulerpion").parentNode as HTMLElement;

    item1.style.zIndex = "100";
    item2.style.zIndex = "100";
    item3.style.zIndex = "100";
    


    let val = Math.abs(this.currdeg) % 360;

    if (val == 0){
      item1.style.zIndex = "200";
      //item1.style.opacity = "1.0";
    }

    if (val == 240){
      item2.style.zIndex = "200";
      // item2.style.opacity = "1.0";
    }

    if (val == 120){
      item3.style.zIndex = "200";
      // item3.style.opacity = "1.0";
    }



  }

  rotationSlide() {
    return "rotateY(" + this.currdeg.toString() + "deg)";

  }
}
