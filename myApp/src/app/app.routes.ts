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
    path: 'suscribete',
    loadComponent: () => import('./suscribete/suscribete.page').then( m => m.SuscribetePage)
  },
  {
    path: 'categorias',
    loadComponent: () => import('./categorias/categorias.page').then( m => m.CategoriasPage)
  },

];
