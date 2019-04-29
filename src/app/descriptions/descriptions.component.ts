import { Component, OnInit } from '@angular/core';
import {DESCRIPTIONSLIST} from '../descript';
import { PersonProfilesService } from '../person-profiles.service';
import { Person } from '../person';

@Component({
  selector: 'app-descriptions',
  templateUrl: './descriptions.component.html',
  styleUrls: ['./descriptions.component.css'],

})
export class DescriptionsComponent implements OnInit {
   
  public descriptionlist : string[];
  public profils:Person[];
  public picturesPath:string="../assets/img/";
  public ID:number=3;

  constructor(private myService:PersonProfilesService) { 
    this.descriptionlist=DESCRIPTIONSLIST;
    this.profils=[];

  
  }


  ngOnInit() {
    this.myService.getProfils().subscribe(
      (param_profils:Person[]) => {
        this.profils = param_profils;
      }
    );
  }

}
