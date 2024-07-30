import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendeursPage } from './vendeurs.page';

const routes: Routes = [
  {
    path: '',
    component: VendeursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendeursPageRoutingModule {}
