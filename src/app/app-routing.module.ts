import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'vendeur-pages/home',
    pathMatch: 'full'
  },
  {
    path: 'vendeur-pages/home',
    loadChildren: () => import('./vendeur-pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'vendeur-pages/clients',
    loadChildren: () => import('./vendeur-pages/clients/clients.module').then(m => m.ClientsPageModule)
  },
  {
    path: 'responsable-pages/home',
    loadChildren: () => import('./responsable-pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'responsable-pages/vendeurs',
    loadChildren: () => import('./responsable-pages/vendeurs/vendeurs.module').then( m => m.VendeursPageModule)
  },
  {
    path: 'vendeur-pages/client-actions',
    loadChildren: () => import('./vendeur-pages/client-actions/client-actions.module').then( m => m.ClientActionsPageModule)
  },
  {
    path: 'vendeur-pages/make-commande',
    loadChildren: () => import('./vendeur-pages/make-commande/make-commande.module').then( m => m.MakeCommandePageModule)
  },
  {
    path: 'vendeur-pages/details-commande',
    loadChildren: () => import('./vendeur-pages/details-commande/details-commande.module').then( m => m.DetailsCommandePageModule)
  },
  {
    path: 'vendeur-pages/bon-livraison',
    loadChildren: () => import('./vendeur-pages/bon-livraison/bon-livraison.module').then( m => m.BonLivraisonPageModule)
  },
  {
    path: 'vendeur-pages/reglement',
    loadChildren: () => import('./vendeur-pages/reglement/reglement.module').then( m => m.ReglementPageModule)
  },
  {
    path: 'vendeur-pages/equipement',
    loadChildren: () => import('./vendeur-pages/equipement/equipement.module').then( m => m.EquipementPageModule)
  },
  {
    path: 'vendeur-pages/reglement-list',
    loadChildren: () => import('./vendeur-pages/reglement-list/reglement-list.module').then( m => m.ReglementListPageModule)
  },









];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
