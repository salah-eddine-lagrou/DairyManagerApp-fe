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


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
