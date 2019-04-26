import { Component, OnInit } from '@angular/core';
import { UserProfil } from '../user-profil';

@Component({
  selector: 'app-espace-connexion',
  templateUrl: './espace-connexion.component.html',
  styleUrls: ['./espace-connexion.component.css']
})
export class EspaceConnexionComponent implements OnInit {

  model: UserProfil = new UserProfil();
  constructor() { }
  onSubmit() {
    console.log(this.model);
  }
  ngOnInit() {
  }

}
