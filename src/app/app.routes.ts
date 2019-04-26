import { Routes } from '@angular/router';
import{YourProfileComponent} from './your-profile/your-profile.component';
import{HomeComponent} from './home/home.component';
import{SpaceMapComponent} from './space-map/space-map.component';
import{HelpComponent} from './help/help.component';
import{DescriptionsComponent} from './descriptions/descriptions.component';
import {PlanetComponent} from './planet/planet.component';
import {PageAccComponent} from './page-acc/page-acc.component';




const ROUTES: Routes = [
  { path: '', component: PageAccComponent },
  { path: 'page-acc', component: PageAccComponent },
  { path: 'planet', component: PlanetComponent },
  { path: 'your-profile', component: YourProfileComponent },
  { path: 'help', component: HelpComponent },
  { path: 'description', component: DescriptionsComponent },


];

export { ROUTES };