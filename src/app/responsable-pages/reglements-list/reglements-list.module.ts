import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReglementsListPageRoutingModule } from './reglements-list-routing.module';

import { ReglementsListPage } from './reglements-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReglementsListPageRoutingModule
  ],
  declarations: [ReglementsListPage]
})
export class ReglementsListPageModule {}
