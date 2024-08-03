import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MakeCommandePageRoutingModule } from './make-commande-routing.module';

import { MakeCommandePage } from './make-commande.page';
import { TruncatePipe } from './truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MakeCommandePageRoutingModule,
    TruncatePipe
  ],
  declarations: [MakeCommandePage]
})
export class MakeCommandePageModule {}
