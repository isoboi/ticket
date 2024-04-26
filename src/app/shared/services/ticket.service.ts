import { Injectable } from '@angular/core'
import { BaseCrudService } from "./base-crud.service";
import { Ticket } from "../models/ticket/ticket";

@Injectable({
  providedIn: 'root',
})
export class TicketService extends BaseCrudService<Ticket> {
  protected override path = 'tickets'
}
