import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsDemandePageRoutingModule } from './details-demande-routing.module';

import { DetailsDemandePage } from './details-demande.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsDemandePageRoutingModule
  ],
  declarations: [DetailsDemandePage]
})
export class DetailsDemandePageModule {}
