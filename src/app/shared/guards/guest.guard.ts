import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth';

/**
 * Guard que protege rutas para usuarios no autenticados (como login/register)
 * Si el usuario ya está autenticado, redirige al dashboard
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    return true;
  }

  // Redirigir al dashboard si ya está autenticado
  router.navigate(['/dashboard']);
  return false;
};
