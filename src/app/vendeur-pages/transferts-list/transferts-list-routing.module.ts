import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransfertsListPage } from './transferts-list.page';

const routes: Routes = [
  {
    path: '',
    component: TransfertsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransfertsListPageRoutingModule {}
