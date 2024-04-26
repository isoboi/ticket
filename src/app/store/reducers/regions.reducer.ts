import { createReducer, on } from '@ngrx/store';
import { loadedSuccessRegionsAction } from "../actions/region.action";
import { Region } from "../../shared/models/region/region";

export const initialState: Region[] = [];

export const regionsReducer = createReducer(
  initialState,
  on(loadedSuccessRegionsAction, (state, payload) => {
    return payload.regions;
  }),
);
