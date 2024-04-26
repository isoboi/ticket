import { createAction, props } from '@ngrx/store';
import { User } from "../../shared/models/user/user";
import { LoginData } from "../../shared/models/auth/login-data";

export enum UserActionType {
  login = '[USER] Login',
  loginSuccess = '[USER] Login Success',
  loginFailed = '[USER] Login Failed',
  set = '[USER] Set',
  update = '[USER] Update',
  updateSuccess = '[USER] Update Success',
  updateFailed = '[USER] Update Failed',
  delete = '[USER] Delete',
}

export const deleteUserAction = createAction(UserActionType.delete);

export const loginAction = createAction(
  UserActionType.login,
  props<{ data: LoginData }>()
);

export const loginActionSuccess = createAction(
  UserActionType.loginSuccess,
  props<{ user: User }>()
);

export const loginActionFailed = createAction(
  UserActionType.loginFailed
);

export const updateAction = createAction(
  UserActionType.update,
  props<{ user: User }>()
);

export const updateActionSuccess = createAction(
  UserActionType.updateSuccess,
  props<{ user: User }>()
);

export const updateActionFailed = createAction(
  UserActionType.updateFailed
)

export const setUserAction = createAction(
  UserActionType.set,
  props<{ user: User }>()
);
