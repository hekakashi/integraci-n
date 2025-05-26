import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FijacionesPage } from './fijaciones.page';

const routes: Routes = [
  {
    path: '',
    component: FijacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FijacionesPageRoutingModule {}
