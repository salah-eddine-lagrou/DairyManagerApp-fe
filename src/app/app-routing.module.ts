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
    path: 'vendeur-pages/view-product',
    loadChildren: () => import('./vendeur-pages/view-product/view-product.module').then( m => m.ViewProductPageModule)
  },





];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
