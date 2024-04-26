import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbService } from "./shared/services/breadcrumb.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  breadcrumbService = inject(BreadcrumbService);

  constructor() {
    this.breadcrumbService.getRouteData();
  }

}
