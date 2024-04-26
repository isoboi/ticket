import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import {
  getAllTicketsAction,
  getByIdTicketsAction,
  TicketsActionType
} from "../actions/ticket.action";
import { TicketService } from "../../shared/services/ticket.service";

@Injectable()
export class TicketsEffects {
  actions$ = inject(Actions);
  ticketService = inject(TicketService);

  loadTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllTicketsAction),
      exhaustMap(() => this.ticketService.getAll({})
        .pipe(
          map(tickets => ({ type: TicketsActionType.loadedSuccess, tickets })),
          catchError(() => EMPTY)
        ))
    )
  );

  loadTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getByIdTicketsAction),
      exhaustMap((payload) => this.ticketService.get(payload.id)
        .pipe(
          map(tickets => ({ type: TicketsActionType.loadedSuccess, tickets: [tickets] })),
          catchError(() => EMPTY)
        ))
    )
  );

  constructor() {
  }
}
