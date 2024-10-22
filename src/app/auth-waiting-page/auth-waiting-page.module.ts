import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthWaitingPagePageRoutingModule } from './auth-waiting-page-routing.module';

import { AuthWaitingPagePage } from './auth-waiting-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthWaitingPagePageRoutingModule
  ],
  declarations: [AuthWaitingPagePage]
})
export class AuthWaitingPagePageModule {}
