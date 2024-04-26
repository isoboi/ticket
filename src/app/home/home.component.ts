import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TicketsComponent } from "../tickets/tickets.component";
import { TicketComponent } from "../tickets/ticket/ticket.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Ticket } from "../shared/models/ticket/ticket";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TicketsComponent,
    TicketComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  store = inject(Store);
  tickets: Ticket[];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.store.select('tickets')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tickets) => {
        this.tickets = tickets;
      });
  }

}
