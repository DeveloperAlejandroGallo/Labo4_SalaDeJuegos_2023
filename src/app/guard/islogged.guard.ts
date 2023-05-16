import { inject } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

export const IsloggedGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.logueado()) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};
