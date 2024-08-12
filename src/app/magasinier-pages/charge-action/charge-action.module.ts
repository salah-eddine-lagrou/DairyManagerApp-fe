import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChargeActionPageRoutingModule } from './charge-action-routing.module';

import { ChargeActionPage } from './charge-action.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChargeActionPageRoutingModule
  ],
  declarations: [ChargeActionPage]
})
export class ChargeActionPageModule {}
