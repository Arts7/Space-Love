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

  public profils:Person[];
  
  constructor( private myService:PersonProfilesService) {
    
    this.updateRotation = false;
		// this.carousel = document.querySelector(".carouselSlide");
		this.currdeg = 0;
		// this.nextButton = document.querySelector(".next");
    // this.prevButton = document.querySelector(".prev");
    
    this.profils=[];

    this.myService.getProfils().subscribe(
      (param_profils:Person[]) => {
        this.profils = param_profils;
      }
    )
   }

  ngOnInit() {
  }


  rotate(e:string): void {
    if (e == "n") {
      this.currdeg = this.currdeg - 60;
    }
    if (e == "p") {
      this.currdeg = this.currdeg + 60;
    }
    this.updateRotation = true;
  }

  rotationSlide() {
    return "rotateY(" + this.currdeg.toString() + "deg)"; 

}
}
