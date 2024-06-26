import { Component, inject } from '@angular/core';
import { BreadcrumbService } from "../../services/breadcrumb.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss'
})
export class BreadcrumbsComponent {
  breadcrumbService = inject(BreadcrumbService);
}
