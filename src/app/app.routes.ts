import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CreerSAEComponent } from './creer-sae/creer-sae.component';

export const routes: Routes = [
    {path: '', component: InscriptionComponent},
    {path: 'Accueil', component: AccueilComponent},
    {path:'CreerSAE', component: CreerSAEComponent}
];
