import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);

  const userData = localStorage.getItem('user');

  // USER NOT LOGGED
  if (!userData) {
    router.navigate(['/login']);

    return false;
  }

  const user = JSON.parse(userData);

  // USER IS ADMIN
  if (user.role === 'admin') {
    return true;
  }

  // USER NOT ADMIN
  router.navigate(['/']);

  return false;
};
