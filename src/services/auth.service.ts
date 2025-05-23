import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API } from '../model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  getMe(): Observable<API.User | null> {
    return this.http
      .get(`${environment.apiUrl}/auth/me`, { withCredentials: true })
      .pipe(map((r) => API.UserSchema.nullable().parse(r)));
  }
}
