import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DechargeActionPageRoutingModule } from './decharge-action-routing.module';

import { DechargeActionPage } from './decharge-action.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DechargeActionPageRoutingModule
  ],
  declarations: [DechargeActionPage]
})
export class DechargeActionPageModule {}
