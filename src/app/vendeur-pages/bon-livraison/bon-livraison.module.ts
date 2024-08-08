import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BonLivraisonPageRoutingModule } from './bon-livraison-routing.module';

import { BonLivraisonPage } from './bon-livraison.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BonLivraisonPageRoutingModule
  ],
  declarations: [BonLivraisonPage]
})
export class BonLivraisonPageModule {}
