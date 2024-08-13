import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendeurActionsPageRoutingModule } from './vendeur-actions-routing.module';

import { VendeurActionsPage } from './vendeur-actions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendeurActionsPageRoutingModule
  ],
  declarations: [VendeurActionsPage]
})
export class VendeurActionsPageModule {}
