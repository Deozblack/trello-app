import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login-page/login-page'),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/pages/register-page/register-page'),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
