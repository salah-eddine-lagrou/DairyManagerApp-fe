import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsActionPage } from './details-action.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsActionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsActionPageRoutingModule {}
