import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransfertsListPageRoutingModule } from './transferts-list-routing.module';

import { TransfertsListPage } from './transferts-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransfertsListPageRoutingModule
  ],
  declarations: [TransfertsListPage]
})
export class TransfertsListPageModule {}
