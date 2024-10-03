import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsDemandePage } from './details-demande.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsDemandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsDemandePageRoutingModule {}
