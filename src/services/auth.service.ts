import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { API } from '@model';
import { environment } from '@environments/environment';
import { getErrorMessage } from '@utils';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  getMe(): Observable<API.User | null> {
    return this.http
      .get(`${environment.apiUrl}/auth/me`, { withCredentials: true })
      .pipe(
        catchError((err) => {
          this.notificationService.addMessage(getErrorMessage(err));
          return throwError(() => new Error(err));
        })
      )
      .pipe(map((r) => API.UserSchema.nullable().parse(r)));
  }
}
