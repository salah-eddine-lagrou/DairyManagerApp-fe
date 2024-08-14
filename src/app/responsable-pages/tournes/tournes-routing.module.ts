import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TournesPage } from './tournes.page';

const routes: Routes = [
  {
    path: '',
    component: TournesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TournesPageRoutingModule {}
