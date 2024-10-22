import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'vendeur-pages/home',
    loadChildren: () => import('./vendeur-pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/clients',
    loadChildren: () => import('./vendeur-pages/clients/clients.module').then(m => m.ClientsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/client-actions',
    loadChildren: () => import('./vendeur-pages/client-actions/client-actions.module').then( m => m.ClientActionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/make-commande',
    loadChildren: () => import('./vendeur-pages/make-commande/make-commande.module').then( m => m.MakeCommandePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/details-commande',
    loadChildren: () => import('./vendeur-pages/details-commande/details-commande.module').then( m => m.DetailsCommandePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/bon-livraison',
    loadChildren: () => import('./vendeur-pages/bon-livraison/bon-livraison.module').then( m => m.BonLivraisonPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/reglement',
    loadChildren: () => import('./vendeur-pages/reglement/reglement.module').then( m => m.ReglementPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/equipement',
    loadChildren: () => import('./vendeur-pages/equipement/equipement.module').then( m => m.EquipementPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/reglement-list',
    loadChildren: () => import('./vendeur-pages/reglement-list/reglement-list.module').then( m => m.ReglementListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/stock-vehicule',
    loadChildren: () => import('./vendeur-pages/stock-vehicule/stock-vehicule.module').then( m => m.StockVehiculePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/transferts-list',
    loadChildren: () => import('./vendeur-pages/transferts-list/transferts-list.module').then( m => m.TransfertsListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/tournes',
    loadChildren: () => import('./vendeur-pages/tournes/tournes.module').then( m => m.TournesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/new-client',
    loadChildren: () => import('./vendeur-pages/new-client/new-client.module').then( m => m.NewClientPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/demandes',
    loadChildren: () => import('./vendeur-pages/demandes/demandes.module').then( m => m.DemandesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'vendeur-pages/details-demande',
    loadChildren: () => import('./vendeur-pages/details-demande/details-demande.module').then( m => m.DetailsDemandePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'magasinier-pages/home',
    loadChildren: () => import('./magasinier-pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'magasinier-pages/charge-action',
    loadChildren: () => import('./magasinier-pages/charge-action/charge-action.module').then( m => m.ChargeActionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'magasinier-pages/decharge-action',
    loadChildren: () => import('./magasinier-pages/decharge-action/decharge-action.module').then( m => m.DechargeActionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'magasinier-pages/details-action',
    loadChildren: () => import('./magasinier-pages/details-action/details-action.module').then( m => m.DetailsActionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'magasinier-pages/ajustement',
    loadChildren: () => import('./magasinier-pages/ajustement/ajustement.module').then( m => m.AjustementPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsable-pages/home',
    loadChildren: () => import('./responsable-pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsable-pages/vendeurs',
    loadChildren: () => import('./responsable-pages/vendeurs/vendeurs.module').then( m => m.VendeursPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsable-pages/vendeur-actions',
    loadChildren: () => import('./responsable-pages/vendeur-actions/vendeur-actions.module').then( m => m.VendeurActionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsable-pages/reglement',
    loadChildren: () => import('./responsable-pages/reglement/reglement.module').then( m => m.ReglementPageModule),
  },
  {
    path: 'responsable-pages/bon-livraison',
    loadChildren: () => import('./responsable-pages/bon-livraison/bon-livraison.module').then( m => m.BonLivraisonPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsable-pages/details-commande',
    loadChildren: () => import('./responsable-pages/details-commande/details-commande.module').then( m => m.DetailsCommandePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsable-pages/equipements',
    loadChildren: () => import('./responsable-pages/equipements/equipements.module').then( m => m.EquipementsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsable-pages/tournes',
    loadChildren: () => import('./responsable-pages/tournes/tournes.module').then( m => m.TournesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsable-pages/reglements-list',
    loadChildren: () => import('./responsable-pages/reglements-list/reglements-list.module').then( m => m.ReglementsListPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsable-pages/demandes',
    loadChildren: () => import('./responsable-pages/demandes/demandes.module').then( m => m.DemandesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'responsable-pages/gratuites',
    loadChildren: () => import('./responsable-pages/gratuites/gratuites.module').then( m => m.GratuitesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth-page/auth-page.module').then( m => m.AuthPagePageModule),
  },
  {
    path: 'auth-waiting',
    loadChildren: () => import('./auth-waiting-page/auth-waiting-page.module').then( m => m.AuthWaitingPagePageModule),
  },
  {
    path: 'notifications-vendeur',
    loadChildren: () => import('./vendeur-pages/notifications-vendeur/notifications.module').then( m => m.NotificationsPageModule)
  },




];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
