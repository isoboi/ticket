import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";
import { MatPaginator } from "@angular/material/paginator";
import { TableColumns } from "../shared/models/common/table-columns";
import { Ticket } from "../shared/models/ticket/ticket";
import { RouterLink } from "@angular/router";
import { AsyncPipe, DatePipe } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { of, tap } from "rxjs";
import { getAllTicketsAction } from "../store/actions/ticket.action";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatIconButton,
    MatTooltip,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    RouterLink,
    DatePipe,
    AsyncPipe
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  store = inject(Store<{ tickets: Ticket[] }>);

  tickets: Ticket[];
  displayedColumns: TableColumns<Ticket> = ['id', 'title', 'created_at', 'updated_at', 'actions'];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.store.select('tickets')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap(tickets => {
          if (tickets?.length < 2) {
            this.store.dispatch(getAllTicketsAction());
            return of(null)
          }
          return tickets;
        })
      ).subscribe((tickets) => {
      this.tickets = tickets;
    });
  }
}
