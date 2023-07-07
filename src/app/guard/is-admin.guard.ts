import { Injectable, inject } from '@angular/core';
import {  Router } from '@angular/router';

import { AuthService } from '../services/auth.service';


export const IsAdminGuard  = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const esAdmin = authService.logInfo()?.esAdmin;

  if (authService.logueado() && esAdmin) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');

};
