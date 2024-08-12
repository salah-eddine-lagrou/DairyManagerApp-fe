import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChargeActionPage } from './charge-action.page';

const routes: Routes = [
  {
    path: '',
    component: ChargeActionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChargeActionPageRoutingModule {}
