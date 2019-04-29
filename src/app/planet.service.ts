import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Planet } from "./planet";

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  constructor(private myService: HttpClient) { }

  public getPlanets(): Observable<any> {
    return this.myService.get("assets/JsonFiles/nph-nstedAPI.json").pipe(
    // return this.myService.get("https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&format=JSON&where=pl_kepflag=1").pipe(
      map(
        (paramData: any[]) => {
          let current = null;
          let planetsList: Planet[] = [];


          for (let i: number = 0; i < paramData.length; i++) {
            current = paramData[i];

            if (current !== 0) {
              let planet: Planet = new Planet();
              planet.id = i;
              planet.hostname = current.pl_hostname;
              planet.letter = current.pl_letter;
              planet.name = current.pl_name;
              planet.orbitalPeriode = current.pl_orbper;
              planet.radiusJupiter = current.pl_radj;
              planet.massJupiter = current.pl_bmassj;
              planet.density = current.pl_dens;
              planet.rightAscension = current.ra;
              planet.declination = current.dec;
              planet.distanceFromOurSolar = current.st_dist;
              planet.temperature = current.st_teff;
              planet.stellarMass = current.st_mass;
              planet.stellarRadius = current.st_rad;
              planet.lastUpdate = current.rowupdate;

              planetsList.push(planet);
            } else {
              console.log("error");
            }
          }
          return planetsList;
        }
      )
    )
  }


}