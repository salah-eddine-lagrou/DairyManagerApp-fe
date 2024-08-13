import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendeurActionsPage } from './vendeur-actions.page';

const routes: Routes = [
  {
    path: '',
    component: VendeurActionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendeurActionsPageRoutingModule {}
