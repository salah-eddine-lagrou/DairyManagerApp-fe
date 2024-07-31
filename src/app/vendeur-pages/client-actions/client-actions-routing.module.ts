import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientActionsPage } from './client-actions.page';

const routes: Routes = [
  {
    path: '',
    component: ClientActionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientActionsPageRoutingModule {}
