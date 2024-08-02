import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MakeCommandePage } from './make-commande.page';

const routes: Routes = [
  {
    path: '',
    component: MakeCommandePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MakeCommandePageRoutingModule {}
