import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { InscriptionComponent } from './inscription/inscription.component';
import {PanelAdminComponent} from './panel-admin/panel-admin.component';

export const routes: Routes = [
    {path: '', component: InscriptionComponent},
    {path: 'Accueil', component: AccueilComponent},
    {path: 'PanelAdmin', component: PanelAdminComponent}
];
