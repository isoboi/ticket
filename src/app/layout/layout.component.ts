import transformJavaScript from '@angular-devkit/build-angular/src/tools/esbuild/javascript-transformer-worker';
import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';
import { AuthService } from "../shared/services/auth.service";
import {
  ActivatedRoute, ActivationEnd,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  RoutesRecognized
} from "@angular/router";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbar } from "@angular/material/toolbar";
import { MatAnchor, MatButton } from "@angular/material/button";
import { Menu } from "../shared/models/menu/menu";
import { User } from "../shared/models/user/user";
import { menu } from "../shared/constants";
import { BreadcrumbsComponent } from "../shared/components/breadcrumbs/breadcrumbs.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatToolbar,
    MatMenu,
    MatMenuItem,
    MatButton,
    MatAnchor,
    MatMenuTrigger,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    BreadcrumbsComponent,
    PushPipe,
    JsonPipe,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  authService = inject(AuthService);
  store = inject(Store);
  user: Observable<User> = this.store.select('user');
  menu: Menu[] = menu;

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  breadcrumbService: BreadcrumbService = inject(BreadcrumbService);
  constructor() {
    this.getRouteData();
  }

  ngOnInit() {

  }

  getRouteData(): void {
    this.router.events
      .subscribe((data) => {
        if (data instanceof RoutesRecognized) {
          this.breadcrumbService.routeData = this.breadcrumbService.renderBreadcrumb(data.state.root.firstChild.firstChild)
        }
      });
  }

  logout(): void {
    this.authService.logout();
  }
}
