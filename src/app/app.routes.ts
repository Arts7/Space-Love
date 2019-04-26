import { Routes } from '@angular/router';
import{YourProfileComponent} from './your-profile/your-profile.component';
import{HomeComponent} from './home/home.component';
import{SpaceMapComponent} from './space-map/space-map.component';
import{HelpComponent} from './help/help.component';
import {PlanetComponent} from './planet/planet.component';



const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'planet', component: PlanetComponent },
  { path: 'your-profile', component: YourProfileComponent },
  { path: 'help', component: HelpComponent },

];

export { ROUTES };