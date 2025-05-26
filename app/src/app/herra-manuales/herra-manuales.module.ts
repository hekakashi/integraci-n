import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HerraManualesPageRoutingModule } from './herra-manuales-routing.module';
import { HerraManualesPage } from './herra-manuales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HerraManualesPageRoutingModule
  ],
  declarations: [HerraManualesPage]
})
export class HerraManualesPageModule {}
