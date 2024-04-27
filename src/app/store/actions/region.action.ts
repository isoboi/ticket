import { createAction, props } from '@ngrx/store';
import { Ticket } from "../../shared/models/ticket/ticket";
import { TicketsActionType } from "./ticket.action";
import { Region } from "../../shared/models/region/region";

export enum RegionsActionType {
  getAll = '[REGION] Get all',
  loadedSuccess = '[REGION] Loaded Success',
}

export const getAllRegionsAction = createAction(RegionsActionType.getAll);

export const getAllRegionsActionSuccess = createAction(
  RegionsActionType.loadedSuccess,
  props<{ regions: Region[] }>()
);
