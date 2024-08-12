import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StockVehiculePage } from './stock-vehicule.page';

const routes: Routes = [
  {
    path: '',
    component: StockVehiculePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockVehiculePageRoutingModule {}
