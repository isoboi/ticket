import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'
import { AuthService } from "../services/auth.service";
import { of } from "rxjs";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  const isAuthorized = authService.isAuthorized();

  if (!isAuthorized) {
    router.navigate(['/login'])
  }

  return of(isAuthorized);
}
