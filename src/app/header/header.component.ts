import { Component, inject } from '@angular/core';
import { NavItem } from './header.model';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, Observable } from 'rxjs';
import { API } from '../../model';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { environment } from '../../environments/environment';

export const nav: NavItem[] = [
  {
    name: 'Strona Główna',
    href: '/',
    authenticated: false,
  },
  {
    name: 'Losuj',
    href: '/random',
    authenticated: false,
  },
  {
    name: 'Dodaj',
    href: '/new',
    authenticated: true,
  },
];

@Component({
  selector: 'layout-header',
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class LayoutHeader {
  me$!: Observable<API.User | null>;
  private authService = inject(AuthService);

  authenticated: boolean = false;
  navItems = nav;

  constructor() {
    this.me$ = this.authService.getMe().pipe(
      map((me) => {
        this.authenticated = !!me;
        return me;
      })
    );
  }

  getLink(path: string): string {
    return `${environment.apiUrl}${path}`;
  }

  isDisabled(item: NavItem): boolean {
    return item.authenticated && !this.authenticated;
  }
}
