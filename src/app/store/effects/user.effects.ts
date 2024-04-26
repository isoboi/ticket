import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NzMessageService } from 'ng-zorro-antd/message';
import { of, switchMap } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from '../../shared/services/storage.service';
import { AuthEnum } from '../../shared/enums/auth.enum';
import { AuthService } from "../../shared/services/auth.service";
import * as UserActions from "../actions/user.action";
import { UserService } from "../../shared/services/user.service";

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);
  storageService = inject(StorageService);
  protected readonly messageService: NzMessageService = inject(NzMessageService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginAction),
      switchMap((payload) => this.authService.login(payload.data)
        .pipe(
          map(user => {
            if (user) {
              this.router.navigate(['/'])
            }
            return UserActions.loginActionSuccess({ user })
          }),
          catchError((err, caught) => {
            this.messageService.error(err.error.message);
            return of(UserActions.loginActionFailed())
          })
        ))
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginActionSuccess, UserActions.updateActionSuccess),
      switchMap(({ user }) => of(UserActions.setUserAction({ user })))
    ))

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateAction),
      switchMap(({ user }) => this.userService.update(user)
        .pipe(
          map(user => {
            this.storageService.setItem(AuthEnum.USER_DATA, user);
            return UserActions.updateActionSuccess({ user })
          }),
          catchError(() => of(UserActions.updateActionFailed))
        ))
    )
  );
}
