import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FijacionesPageRoutingModule } from './fijaciones-routing.module';

import { FijacionesPage } from './fijaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FijacionesPageRoutingModule,
    FijacionesPage
  ],
})
export class FijacionesPageModule {}
