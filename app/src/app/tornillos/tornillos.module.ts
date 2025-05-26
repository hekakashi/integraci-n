import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TornillosPageRoutingModule } from './tornillos-routing.module';

import { TornillosPage } from './tornillos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TornillosPageRoutingModule,
    TornillosPage  // SOLO en imports, NO en declarations
  ],
  // declarations: []  <-- quita declarations
})
export class TornillosPageModule {}
