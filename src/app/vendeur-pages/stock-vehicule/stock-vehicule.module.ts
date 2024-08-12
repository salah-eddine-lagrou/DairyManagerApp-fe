import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockVehiculePageRoutingModule } from './stock-vehicule-routing.module';

import { StockVehiculePage } from './stock-vehicule.page';
import { TruncatePipe } from "../make-commande/truncate.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StockVehiculePageRoutingModule,
    TruncatePipe
],
  declarations: [StockVehiculePage]
})
export class StockVehiculePageModule {}
