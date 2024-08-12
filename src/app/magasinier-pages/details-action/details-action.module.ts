import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsActionPageRoutingModule } from './details-action-routing.module';

import { DetailsActionPage } from './details-action.page';
import { TruncatePipe } from "../../vendeur-pages/make-commande/truncate.pipe";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsActionPageRoutingModule,
    TruncatePipe
],
  declarations: [DetailsActionPage]
})
export class DetailsActionPageModule {}
