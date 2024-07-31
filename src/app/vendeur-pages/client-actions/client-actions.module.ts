import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientActionsPageRoutingModule } from './client-actions-routing.module';

import { ClientActionsPage } from './client-actions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientActionsPageRoutingModule
  ],
  declarations: [ClientActionsPage]
})
export class ClientActionsPageModule {}
