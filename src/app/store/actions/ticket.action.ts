import { createAction, props } from '@ngrx/store';
import { Ticket } from "../../shared/models/ticket/ticket";

export enum TicketsActionType {
  getAll = '[TICKET] Get all',
  getById = '[TICKET] Get by id',
  loadedSuccess = '[TICKET] Loaded Success',
}

export const getAllTicketsAction = createAction(TicketsActionType.getAll);
export const getAllTicketsActionSuccess = createAction(
  TicketsActionType.loadedSuccess,
  props<{ tickets: Ticket[] }>()
);

export const getTicketsByIdAction = createAction(
  TicketsActionType.getById,
  props<{ id: number }>()
);
