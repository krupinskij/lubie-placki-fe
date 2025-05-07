import { Component, signal } from '@angular/core';
import { NavItem } from './header.model';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

export const nav: NavItem[] = [
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

@Component({
  selector: 'layout-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class LayoutHeader {
  navItems = nav;
}
