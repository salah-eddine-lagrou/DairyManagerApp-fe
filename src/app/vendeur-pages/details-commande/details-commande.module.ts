import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsCommandePageRoutingModule } from './details-commande-routing.module';

import { DetailsCommandePage } from './details-commande.page';
import { TruncatePipe } from "../make-commande/truncate.pipe";
import { MakeCommandePageModule } from "../make-commande/make-commande.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsCommandePageRoutingModule,
    TruncatePipe,
    MakeCommandePageModule
  ],
  declarations: [DetailsCommandePage]
})
export class DetailsCommandePageModule {}
