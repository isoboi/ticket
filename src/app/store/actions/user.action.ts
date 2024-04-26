import { createAction, props } from '@ngrx/store';
import { User } from "../../shared/models/user/user";
import { LoginData } from "../../shared/models/auth/login-data";

export enum UserActionType {
  login = '[USER] Login',
  set = '[USER] Set',
  update = '[USER] Update',
  delete = '[USER] Delete',
}
export const deleteUserAction = createAction(UserActionType.delete);
export const loginAction = createAction(
  UserActionType.login,
  props<{ data: LoginData }>()
);
export const updateAction = createAction(
  UserActionType.update,
  props<{ data: User }>()
);
export const setUserAction = createAction(
  UserActionType.set,
  props<{ user: User }>()
);
