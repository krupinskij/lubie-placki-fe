import { Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutHeader } from './header/header.component';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutHeader],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'lubie-placki-fe';

  private notificationService = inject(NotificationService);
  notifications = signal<Notification[]>([]);

  constructor() {
    effect(() => {
      this.notificationService.get().subscribe((next) => {
        this.notifications.set(next);
      });
    });
  }
}
