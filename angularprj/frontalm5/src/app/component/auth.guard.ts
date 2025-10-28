import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const  router = inject(Router);

  const usuario = localStorage.getItem('usuario') || sessionStorage.getItem('usuario');

  if (usuario) {
    // ✅ Si existe sesión, permite acceder
    return true;
  } else {
    // 🚫 Si no hay sesión, redirige al login
    router.navigate(['/login']);
    return false;
  }

};
