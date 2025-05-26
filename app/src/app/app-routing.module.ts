import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'materiales',
    loadComponent: () => import('./materiales/materiales.page').then((m) => m.MaterialesPage),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then((m) => m.RegistroPage),
  },
  {
    path: 'iniciar',
    loadComponent: () => import('./iniciar/iniciar.page').then((m) => m.IniciarPage),
  },
  {
    path: 'herra-manuales',
    loadComponent: () => import('./herra-manuales/herra-manuales.page').then((m) => m.HerraManualesPage),
  },
  {
    path: 'equipo',
    loadComponent: () => import('./equipo/equipo.page').then((m) => m.EquipoPage),
  },
  {
  path: 'pago',
  loadChildren: () => import('./pago/pago.module').then(m => m.PagoPageModule)
  },
  {
    path: 'suscribirse',
    loadChildren: () => import('./suscribirse/suscribirse.module').then( m => m.SuscribirsePageModule)
  },
  {
    path: 'tornillos',
    loadChildren: () => import('./tornillos/tornillos.module').then( m => m.TornillosPageModule)
  },
  {
    path: 'medicion',
    loadChildren: () => import('./medicion/medicion.module').then( m => m.MedicionPageModule)
  },
  {
    path: 'fijaciones',
    loadChildren: () => import('./fijaciones/fijaciones.module').then( m => m.FijacionesPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
