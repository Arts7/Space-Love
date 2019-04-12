import { Component, OnInit } from '@angular/core';
import { PersonProfilesService } from '../person-profiles.service';
import { Person } from '../person';

@Component({
  selector: 'app-simple-profiles',
  templateUrl: './simple-profiles.component.html',
  styleUrls: ['./simple-profiles.component.css']
})
export class SimpleProfilesComponent implements OnInit {

  public profils:Person[];
  //public picturesPath:string="../assets/img/";

  constructor(private myService:PersonProfilesService) {
    this.profils=[];

    this.myService.getProfils().subscribe(
      (param_profils:Person[]) => {
        this.profils = param_profils;
      }
    )
   }

  ngOnInit() {
  }

}
