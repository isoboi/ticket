import { Injectable } from '@angular/core'
import { BaseCrudService } from "./base-crud.service";
import { Region } from "../models/region/region";

@Injectable({
  providedIn: 'root',
})
export class RegionService extends BaseCrudService<Region> {
  protected override path = 'regions'
}
