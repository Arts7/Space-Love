import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HelpComponent } from './help/help.component';
import { SpaceMapComponent } from './space-map/space-map.component';
import { HomeComponent } from './home/home.component';
import { YourProfileComponent } from './your-profile/your-profile.component';
import {ROUTES} from './app.routes';
import { LogoComponent } from './logo/logo.component';
import { DescriptionsComponent } from './descriptions/descriptions.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HelpComponent,
    SpaceMapComponent,
    HomeComponent,
    YourProfileComponent,
    LogoComponent,
    DescriptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
