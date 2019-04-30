import { Component, OnInit } from '@angular/core';
import { DESCRIPTIONSLIST } from '../descript';
import { PersonProfilesService } from '../person-profiles.service';
import { Person } from '../person';
import { ID } from "../critere";

@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.css'],

})
export class DescriptionsComponent implements OnInit {

  public descriptionlist: string[];
  public profils: Person[];
  public profil: Person;
  public picturesPath: string = "../assets/img/";
  public index:number;
  // public index: number = 3;

  constructor(private myService: PersonProfilesService) {
    this.descriptionlist = DESCRIPTIONSLIST;
    this.profils = [];
    this.profil = new Person();
    this.index = ID[0] - 1;
    console.log("Voici l'index :", this.index);
    // console.log("Voici le profil :", this.profil);

  }


  ngOnInit() {
    this.myService.getProfils().subscribe(
      (param_profils: Person[]) => {
        this.profils = param_profils;
        this.profil = this.profils[this.index];

        console.log(this.profil.photos);
      }
    );

  }

}
