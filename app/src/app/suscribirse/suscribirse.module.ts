import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SuscribirsePageRoutingModule } from './suscribirse-routing.module';
import { SuscribirsePage } from './suscribirse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuscribirsePageRoutingModule,
    SuscribirsePage
  ],
})
export class SuscribirsePageModule {}
