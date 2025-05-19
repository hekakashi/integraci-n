import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },  {
    path: 'materiales',
    loadComponent: () => import('./materiales/materiales.page').then( m => m.MaterialesPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'iniciar',
    loadComponent: () => import('./iniciar/iniciar.page').then( m => m.IniciarPage)
  },
  {
    path: 'herra-manuales',
    loadComponent: () => import('./herra-manuales/herra-manuales.page').then( m => m.HerraManualesPage)
  },
  {
    path: 'equipo',
    loadComponent: () => import('./equipo/equipo.page').then( m => m.EquipoPage)
  },

];
