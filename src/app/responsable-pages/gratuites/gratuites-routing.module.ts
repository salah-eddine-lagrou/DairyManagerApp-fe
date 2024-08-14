import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GratuitesPage } from './gratuites.page';

const routes: Routes = [
  {
    path: '',
    component: GratuitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GratuitesPageRoutingModule {}
