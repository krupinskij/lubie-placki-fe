import { Component } from '@angular/core';
import { NavItem } from './header.model';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class LayoutHeader {
  navItems: NavItem[] = [
    {
      name: 'Strona Główna',
      href: '/',
    },
    {
      name: 'Losuj',
      href: '/random',
    },
    {
      name: 'Dodaj',
      href: '/new',
    },
  ];
}
