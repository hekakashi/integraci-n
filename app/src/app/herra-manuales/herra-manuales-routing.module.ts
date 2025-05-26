import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HerraManualesPage } from './herra-manuales.page';

const routes: Routes = [
  {
    path: '',
    component: HerraManualesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerraManualesPageRoutingModule {}
