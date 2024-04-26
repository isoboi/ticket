import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { Ticket } from "../../shared/models/ticket/ticket";
import { ticketsReducer } from "./tickets.reducer";
import { User } from "../../shared/models/user/user";
import { userReducer } from "./user.reducer";
import { Region } from "../../shared/models/region/region";
import { regionsReducer } from "./regions.reducer";

export interface State {
  tickets: Ticket[];
  regions: Region[];
  user: User;
}

export const reducers: ActionReducerMap<State> = {
  tickets: ticketsReducer,
  regions: regionsReducer,
  user: userReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
