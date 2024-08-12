import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DechargeActionPage } from './decharge-action.page';

const routes: Routes = [
  {
    path: '',
    component: DechargeActionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DechargeActionPageRoutingModule {}
