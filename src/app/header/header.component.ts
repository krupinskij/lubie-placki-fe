import { Component, inject } from '@angular/core';
import { NavItem } from './header.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { API } from '../../model';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

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
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class LayoutHeader {
  me$!: Observable<API.User | null | undefined>;
  private authService = inject(AuthService);

  navItems = nav;

  constructor() {
    this.me$ = this.authService.getMe();
  }
}
