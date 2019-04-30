import { Component, OnInit, OnChanges, Input, SimpleChanges, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { Planet } from "../planet";
import { PlanetService } from "../planet.service";
import { critereList } from "../critere";
import { PersonProfilesService } from '../person-profiles.service';
import { Person } from '../person';
import { profilsMatch } from "../critere";
import { planetProfil } from "../critere";


@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {

  @Input() public planetID: number;

  public planets: Planet[] = [];
  public planet: Planet = new Planet();
  public searchList: any[];
  public profils: Person[];
  public critereList = critereList;
  // public picturesPath:string="../assets/img/";
  public numberProfilsMatch: number;


  constructor(private myService: PlanetService, private myProfilsService: PersonProfilesService) {
    this.planet = null;
    this.profils = [];
    this.searchList = [];
    this.numberProfilsMatch = 0;
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
    // creation of the planets list
    this.myService.getPlanets().subscribe(
      (param_planets: Planet[]) => {
        for (let i: number = 0; i < 24; i++) {
          this.planets.push(param_planets[Math.floor((Math.random() * param_planets.length))]);
        }
        this.planet = this.planets[this.planetID];


        // creation of the profils list
        this.myProfilsService.getProfils().subscribe(
          (param_profils: Person[]) => {
            this.profils = param_profils;
            // console.log("liste des profils 1:", this.profils);



            let sexe = this.critereList[0].Sexe;
            let nbEyes = this.critereList[0].nbEyes;
            let skinType = this.critereList[0].Skins;

            /*
            let sexe = "Male";
            let nbEyes= 2;
            let skinType = "Smooth";
            */
            // console.log("critères de recherche :" + sexe + nbEyes + skinType)

            // console.log("liste des profils 2:", this.profils);

            this.searchList = this.profils.filter(
              (profil) => {
                if ((profil.sexe.toUpperCase() == sexe.toUpperCase()) && (Number(profil.nberEyes) == nbEyes) && (profil.typeSkin.toUpperCase() == skinType.toUpperCase())) {
                  console.log(profil.sexe.toUpperCase(), Number(profil.nberEyes), profil.typeSkin.toUpperCase());
                  return true;
                }
              }
            );
            console.log("These are the profils which match :", this.searchList);

            this.numberProfilsMatch = this.searchList.length;
          }
        );

      }
    );
  }

  onChoosePlanet() {
    for (let i: number = 0; i < this.searchList.length; i++) {
      profilsMatch.push(this.searchList[i]);
    }
    console.log("This is the list of the profils :", profilsMatch);
    planetProfil.push(this.planet);
    console.log("This is the planet :", planetProfil);
  }

  // ngOnDestroy() {
  //   this.onChoosePlanet();
  // }
}
