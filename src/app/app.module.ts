import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from "@angular/forms";

import { PlanetComponent } from './planet/planet.component';
import { PlanetSystemComponent } from './planet-system/planet-system.component';
import { AppComponent } from './app.component';
import { EspaceConnexionComponent } from './espace-connexion/espace-connexion.component';
import { EspaceRechercheComponent } from './espace-recherche/espace-recherche.component';
import { PageAccComponent } from './page-acc/page-acc.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanetComponent,
    PlanetSystemComponent,
    EspaceConnexionComponent,
    EspaceRechercheComponent,
    PageAccComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
