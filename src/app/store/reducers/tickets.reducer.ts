import { createReducer, on } from '@ngrx/store';
import { Ticket } from "../../shared/models/ticket/ticket";
import {
  getAllTicketsAction,
  loadedSuccessTicketsAction
} from "../actions/ticket.action";

export const initialState: Ticket[] = [];

export const ticketsReducer = createReducer(
  initialState,
  on(getAllTicketsAction, (state) => state),
  on(loadedSuccessTicketsAction, (state, payload) => {
    state = payload.tickets;
    return state;
  }),
);
