import { Menu } from './models/menu/menu';

export const menu: Menu[] = [
  {
    title: 'Главная',
    link: '/home'
  },
  {
    title: 'Тикеты',
    link: '/tickets'
  },
];


export enum Path {
  login = 'login',
  home = 'home',
  tickets = 'tickets',
  profile = 'profile',
  ticket = 'ticket'
}

export const Breadcrumbs = {
  profile: {
    title: 'Профиль',
    link: 'profile'
  },
  home: {
    title: 'Главная',
    link: 'home'
  },
  tickets: {
    title: 'Тикеты',
    link: 'tickets'
  }
}
