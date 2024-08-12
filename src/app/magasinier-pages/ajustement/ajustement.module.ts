import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjustementPageRoutingModule } from './ajustement-routing.module';

import { AjustementPage } from './ajustement.page';
import { TruncatePipe } from "../../vendeur-pages/make-commande/truncate.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AjustementPageRoutingModule,
    TruncatePipe
],
  declarations: [AjustementPage]
})
export class AjustementPageModule {}
