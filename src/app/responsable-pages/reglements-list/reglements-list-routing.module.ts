import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReglementsListPage } from './reglements-list.page';

const routes: Routes = [
  {
    path: '',
    component: ReglementsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReglementsListPageRoutingModule {}
