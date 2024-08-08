import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BonLivraisonPage } from './bon-livraison.page';

const routes: Routes = [
  {
    path: '',
    component: BonLivraisonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BonLivraisonPageRoutingModule {}
