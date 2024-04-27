import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PushPipe } from '@ngrx/component';
import { Observable } from 'rxjs';
import {
  BaseBreadCrumbsComponentComponent
} from '../base-bread-crumbs-component/base-bread-crumbs-component.component';
import { TicketsComponent } from "../tickets/tickets.component";
import { TicketComponent } from "../tickets/ticket/ticket.component";
import { Ticket } from "../shared/models/ticket/ticket";
import { Store } from "@ngrx/store";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TicketsComponent,
    TicketComponent,
    PushPipe
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends BaseBreadCrumbsComponentComponent{
  store = inject(Store);
  tickets: Observable<Ticket[]> = this.store.select('tickets');
  constructor(private activeRoute: ActivatedRoute) {
    super(activeRoute)
  }
}
