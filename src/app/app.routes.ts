import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/pages/login-page/login-page'),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
