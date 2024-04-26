import { Routes } from '@angular/router';
import { Path } from './shared/constants';
import { authGuard } from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path: Path.login,
    loadComponent: () => import('./auth/auth.component').then(x => x.AuthComponent),
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(x => x.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: Path.home,
        loadComponent: () => import('./home/home.component').then(x => x.HomeComponent),
        data: { breadcrumbs: [Path.home] }
      },
      {
        path: Path.tickets,
        loadComponent: () => import('./tickets/tickets.component').then(x => x.TicketsComponent),
        data: { breadcrumbs: [Path.home, Path.tickets] }
      },
      {
        path: Path.ticket + '/:id',
        loadComponent: () => import('./tickets/ticket/ticket.component').then(x => x.TicketComponent),
        data: { breadcrumbs: [Path.home, Path.tickets, Path.ticket] }
      },
      {
        path: Path.profile + '/:id',
        loadComponent: () => import('./profile/profile.component').then(x => x.ProfileComponent),
        data: { breadcrumbs: [Path.home, Path.profile] }
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: Path.home,
      },
    ],
  },

];
