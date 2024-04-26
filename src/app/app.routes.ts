import { Routes } from '@angular/router';
import { authGuard } from "./shared/guards/auth.guard";

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/auth.component').then(x => x.AuthComponent),
  },
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(x => x.LayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.component').then(x => x.HomeComponent),
        data: { breadcrumbs: ['home'] }
      },
      {
        path: 'tickets',
        loadComponent: () => import('./tickets/tickets.component').then(x => x.TicketsComponent),
        data: { breadcrumbs: ['home', 'tickets'] }
      },
      {
        path: 'ticket/:id',
        loadComponent: () => import('./tickets/ticket/ticket.component').then(x => x.TicketComponent),
        data: { breadcrumbs: ['home', 'tickets', 'ticket'] }
      },
      {
        path: 'profile/:id',
        loadComponent: () => import('./profile/profile.component').then(x => x.ProfileComponent),
        data: { breadcrumbs: ['home', 'profile'] }
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home',
      },
    ],
  },

];
