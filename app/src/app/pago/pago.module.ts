import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { PagoPageRoutingModule } from './pago-routing.module';
import { PagoPage } from './pago.page';  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    PagoPageRoutingModule,
    PagoPage
  ],

})
export class PagoPageModule {}
