import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsCommandePage } from './details-commande.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsCommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsCommandePageRoutingModule {}
