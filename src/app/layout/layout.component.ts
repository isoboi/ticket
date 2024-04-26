import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from "../shared/services/auth.service";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbar } from "@angular/material/toolbar";
import { MatAnchor, MatButton } from "@angular/material/button";
import { Menu } from "../shared/models/menu/menu";
import { User } from "../shared/models/user/user";
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
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  user: User;
  menu: Menu[] = [
    {
      title: 'Главная',
      link: '/home'
    },
    {
      title: 'Тикеты',
      link: '/tickets'
    },
  ];

  ngOnInit() {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
