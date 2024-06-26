import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  BaseBreadCrumbsComponentComponent
} from '../../base-bread-crumbs-component/base-bread-crumbs-component.component';
import { Ticket } from "../../shared/models/ticket/ticket";
import { ActivatedRoute } from "@angular/router";
import { MatProgressBar } from "@angular/material/progress-bar";
import { DatePipe, NgIf } from "@angular/common";
import { Store } from "@ngrx/store";
import { getTicketsByIdAction } from "../../store/actions/ticket.action";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatCardContent,
    MatCardFooter,
    MatProgressBar,
    DatePipe,
    NgIf
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent extends BaseBreadCrumbsComponentComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  route = inject(ActivatedRoute);
  store = inject(Store);
  id: number;

  @Input() ticket: Ticket;

  isLoading: boolean;

  constructor(activeRoute: ActivatedRoute) {
    super(activeRoute)
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];

    if (this.id) {
      this.store.dispatch(getTicketsByIdAction({ id: this.id }));
    }
    if (!this.ticket && this.id) {
      this.checkData();
    }
  }

  checkData(): void {
    this.store.select('tickets')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tickets: Ticket[]) => {
        this.ticket = tickets.find(x => x.id === this.id);
      });
  }
}
