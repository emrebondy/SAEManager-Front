import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { CreerSAEComponent } from './creer-sae/creer-sae.component';
import { SaeComponent } from './sae/sae.component';
import {PanelAdminComponent} from './panel-admin/panel-admin.component';
import {AdminGuard} from './services/admin.guard';


export const routes: Routes = [
    {
      path: 'inscription',
      loadComponent: () =>
        import('./inscription/inscription.component').then(m => m.InscriptionComponent)
    },
    {path: 'Accueil', component: AccueilComponent},
    {path:'CreerSAE', component: CreerSAEComponent},
    {path:'SAE', component: SaeComponent},
    {path: 'PanelAdmin', component: PanelAdminComponent, canActivate: [AdminGuard]}
];
