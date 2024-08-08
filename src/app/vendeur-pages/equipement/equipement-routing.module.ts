import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipementPage } from './equipement.page';

const routes: Routes = [
  {
    path: '',
    component: EquipementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipementPageRoutingModule {}
