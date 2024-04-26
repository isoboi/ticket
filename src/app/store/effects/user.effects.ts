import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthService } from "../../shared/services/auth.service";
import { loginAction, updateAction, UserActionType } from "../actions/user.action";
import { UserService } from "../../shared/services/user.service";

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  userService = inject(UserService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      exhaustMap((payload) => this.authService.login(payload.data)
        .pipe(
          map(user => ({ type: UserActionType.set, user })),
          catchError(() => EMPTY)
        ))
    )
  );
  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAction),
      exhaustMap((payload) => this.userService.update(payload.data)
        .pipe(
          map(() => ({ type: UserActionType.set, user: payload.data })),
          catchError(() => EMPTY)
        ))
    )
  );
}
