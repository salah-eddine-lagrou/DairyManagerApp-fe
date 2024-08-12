import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournesPageRoutingModule } from './tournes-routing.module';

import { TournesPage } from './tournes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournesPageRoutingModule
  ],
  declarations: [TournesPage]
})
export class TournesPageModule {}
