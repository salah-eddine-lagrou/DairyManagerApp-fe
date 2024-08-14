import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipementsPageRoutingModule } from './equipements-routing.module';

import { EquipementsPage } from './equipements.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipementsPageRoutingModule
  ],
  declarations: [EquipementsPage]
})
export class EquipementsPageModule {}
