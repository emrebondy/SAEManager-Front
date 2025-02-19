import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CreerSAEComponent } from './creer-sae/creer-sae.component';
import { SaeComponent } from './sae/sae.component';
import {PanelAdminComponent} from './panel-admin/panel-admin.component';
import { SaeComponent } from './sae/sae.component';

export const routes: Routes = [
    {path: '', component: InscriptionComponent},
    {path: 'Accueil', component: AccueilComponent},
    {path:'CreerSAE', component: CreerSAEComponent},
    {path:'SAE', component: SaeComponent},
    {path:'SAE', component: SaeComponent},
    {path: 'PanelAdmin', component: PanelAdminComponent}
];
