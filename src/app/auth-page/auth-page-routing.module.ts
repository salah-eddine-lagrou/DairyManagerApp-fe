import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPagePage } from './auth-page.page';

const routes: Routes = [
  {
    path: '',
    component: AuthPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPagePageRoutingModule {}
