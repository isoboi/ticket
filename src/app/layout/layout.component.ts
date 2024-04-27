import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PushPipe } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from "../shared/services/auth.service";
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
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
export class LayoutComponent {

  authService = inject(AuthService);
  store = inject(Store);
  user: Observable<User> = this.store.select('user');
  menu: Menu[] = menu;
  router = inject(Router);

  constructor() {
  }

  logout(): void {
    this.authService.logout();
  }
}
