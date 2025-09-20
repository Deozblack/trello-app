import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth';

/**
 * Factory function para crear un guard que verifica roles específicos
 * @param allowedRoles Array de roles permitidos
 * @param redirectTo Ruta a la que redirigir si no tiene permisos (default: '/dashboard')
 */
export const roleGuard = (allowedRoles: string[], redirectTo = '/dashboard'): CanActivateFn => {
  return async () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }

    // Aquí puedes implementar la lógica para verificar roles
    // Por ejemplo, obteniendo los metadatos del usuario desde Supabase
    const session = await authService.getSession();
    const userRole = session?.user?.user_metadata?.['role'] || 'user';

    if (allowedRoles.includes(userRole)) {
      return true;
    }

    router.navigate([redirectTo]);
    return false;
  };
};
