import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { PlanetComponent } from './planet/planet.component';
import { PlanetSystemComponent } from './planet-system/planet-system.component';
import { AppComponent } from './app.component';
import { EspaceConnexionComponent } from './espace-connexion/espace-connexion.component';
import { FlagComponent } from './flag/flag.component';
import { WrapComponent } from './wrap/wrap.component';

@NgModule({
  declarations: [
    AppComponent,
    PlanetComponent,
    PlanetSystemComponent,
    EspaceConnexionComponent,
    FlagComponent,
    WrapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
