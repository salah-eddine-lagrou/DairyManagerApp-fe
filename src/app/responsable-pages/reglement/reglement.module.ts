import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReglementPageRoutingModule } from './reglement-routing.module';

import { ReglementPage } from './reglement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReglementPageRoutingModule
  ],
  declarations: [ReglementPage]
})
export class ReglementPageModule {}
