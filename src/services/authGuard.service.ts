import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): MaybeAsync<GuardResult> {
    return this.authService.getMe().pipe(
      map((me) => {
        if (!me) {
          this.router.navigate(['']);
        }
        return true;
      })
    );
  }
}
