import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';

@Component({
  selector: 'app-base-bread-crumbs-component',
  standalone: true,
  imports: [],
  templateUrl: './base-bread-crumbs-component.component.html',
  styleUrl: './base-bread-crumbs-component.component.scss'
})
export class BaseBreadCrumbsComponentComponent {
  breadcrumbService: BreadcrumbService = inject(BreadcrumbService);
  constructor(activatedRoute: ActivatedRoute) {
    this.breadcrumbService.routeData = this.breadcrumbService.renderBreadcrumb(activatedRoute.snapshot);
  }
}
