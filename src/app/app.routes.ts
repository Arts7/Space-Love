import { Routes } from '@angular/router';
import{YourProfileComponent} from './your-profile/your-profile.component';
import{HomeComponent} from './home/home.component';
import{SpaceMapComponent} from './space-map/space-map.component';
import{HelpComponent} from './help/help.component';
import{DescriptionsComponent} from './descriptions/descriptions.component';
import { PlanetComponent } from "./planet/planet.component";
import { EspaceRechercheComponent } from "./espace-recherche/espace-recherche.component";
import { EspaceConnexionComponent } from './espace-connexion/espace-connexion.component';
import { SimpleProfilesComponent } from './simple-profiles/simple-profiles.component';



const ROUTES: Routes = [
  { path: '', redirectTo: 'searchPage', pathMatch:'full' },
  { path: 'home', component: EspaceConnexionComponent },
  { path: 'space-map', component: SpaceMapComponent },
  { path: 'your-profile', component: YourProfileComponent },
  { path: 'help', component: HelpComponent },
  { path: 'descriptions', component: SimpleProfilesComponent},

  { path: 'planet', component: PlanetComponent },
  { path: 'searchPage', component: EspaceRechercheComponent },
];

export { ROUTES };