import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from "@angular/forms";

import { PlanetComponent } from './planet/planet.component';
import { PlanetSystemComponent } from './planet-system/planet-system.component';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HelpComponent } from './help/help.component';
import { SpaceMapComponent } from './space-map/space-map.component';
import { HomeComponent } from './home/home.component';
import { YourProfileComponent } from './your-profile/your-profile.component';
import { ROUTES } from './app.routes';
import { LogoComponent } from './logo/logo.component';
import { DescriptionsComponent } from './descriptions/descriptions.component';
import { EspaceConnexionComponent } from './espace-connexion/espace-connexion.component';
import { FlagComponent } from './flag/flag.component';
import { WrapComponent } from './wrap/wrap.component';
import { EspaceRechercheComponent } from './espace-recherche/espace-recherche.component';
import { PageAccComponent } from './page-acc/page-acc.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HelpComponent,
    SpaceMapComponent,
    HomeComponent,
    YourProfileComponent,
    LogoComponent,
    DescriptionsComponent,
    PlanetComponent,
    PlanetSystemComponent,
    EspaceConnexionComponent,
    FlagComponent,
    WrapComponent,
    EspaceRechercheComponent,
    PageAccComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
