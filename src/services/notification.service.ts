import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private notifications: Notification[] = [];
  private subject = new BehaviorSubject<Notification[]>([]);

  get(): BehaviorSubject<Notification[]> {
    return this.subject;
  }

  addMessage(message: string): void {
    const notification: Notification = {
      id: Math.random(),
      message,
    };
    this.notifications.push(notification);
    this.subject.next([...this.notifications]);

    setTimeout(() => {
      this.notifications = this.notifications.filter((n) => n != notification);
      this.subject.next([...this.notifications]);
    }, 2000);
  }
}
