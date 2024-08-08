import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReglementListPage } from './reglement-list.page';

const routes: Routes = [
  {
    path: '',
    component: ReglementListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglementListPageRoutingModule {}
