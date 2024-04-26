import { createReducer, on } from '@ngrx/store';
import { deleteUserAction, setUserAction } from "../actions/user.action";
import { User } from "../../shared/models/user/user";

export const initialState: User = null;

export const userReducer = createReducer(
  initialState,
  on(setUserAction, (state, payload) => {
    if (state) {
      state = Object.assign(JSON.parse(JSON.stringify(state)), payload.user);
    } else {
      state = payload.user;
    }
    return state;
  }),
  on(deleteUserAction, (state, payload) => {
    state = null;
    return state;
  }),
);
