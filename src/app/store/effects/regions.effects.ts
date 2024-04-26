import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { RegionService } from "../../shared/services/region.service";
import { getAllRegionsAction, RegionsActionType } from "../actions/region.action";

@Injectable()
export class RegionsEffects {
  actions$ = inject(Actions);
  regionService = inject(RegionService);

  loadRegions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllRegionsAction),
      exhaustMap(() => this.regionService.getAll({})
        .pipe(
          map(regions => ({ type: RegionsActionType.loadedSuccess, regions })),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor() {
  }
}
