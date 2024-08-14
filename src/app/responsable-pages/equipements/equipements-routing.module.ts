import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipementsPage } from './equipements.page';

const routes: Routes = [
  {
    path: '',
    component: EquipementsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipementsPageRoutingModule {}
