import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReglementPage } from './reglement.page';

const routes: Routes = [
  {
    path: '',
    component: ReglementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglementPageRoutingModule {}
