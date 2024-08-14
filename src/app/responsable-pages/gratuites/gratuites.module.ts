import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GratuitesPageRoutingModule } from './gratuites-routing.module';

import { GratuitesPage } from './gratuites.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GratuitesPageRoutingModule
  ],
  declarations: [GratuitesPage]
})
export class GratuitesPageModule {}
