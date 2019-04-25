import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person';


@Injectable({
  providedIn: 'root'
})
export class PersonProfilesService {
  
  constructor(private myService:HttpClient) { }

  public getProfils():Observable<any>{
    return this.myService.get("assets/JsonFiles/Profils.json");
    
  }
}
