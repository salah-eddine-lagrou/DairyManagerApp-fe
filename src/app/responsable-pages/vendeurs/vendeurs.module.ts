import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendeursPageRoutingModule } from './vendeurs-routing.module';

import { VendeursPage } from './vendeurs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendeursPageRoutingModule
  ],
  declarations: [VendeursPage]
})
export class VendeursPageModule {}
