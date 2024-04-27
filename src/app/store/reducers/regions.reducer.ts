import { createReducer, on } from '@ngrx/store';
import { getAllRegionsActionSuccess } from "../actions/region.action";
import { Region } from "../../shared/models/region/region";

export const initialState: Region[] = [];

export const regionsReducer = createReducer(
  initialState,
  on(getAllRegionsActionSuccess, (state, payload) => {
    return [...payload.regions];
  }),
);
