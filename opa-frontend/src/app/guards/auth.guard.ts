import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const user = localStorage.getItem('user');

  // USER LOGGED
  if (user) {
    return true;
  }

  // USER NOT LOGGED
  router.navigate(['/login']);

  return false;
};
