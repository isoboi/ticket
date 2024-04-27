import { createReducer, on } from '@ngrx/store';
import { Ticket } from "../../shared/models/ticket/ticket";
import {
  getAllTicketsAction,
  getAllTicketsActionSuccess
} from "../actions/ticket.action";

export const initialState: Ticket[] = [];

export const ticketsReducer = createReducer(
  initialState,
  on(getAllTicketsAction, (state) => state),
  on(getAllTicketsActionSuccess, (state, payload) => {
    return [...payload.tickets];
  }),
);
