import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { API } from '../model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  getMe(): Observable<API.User | null> {
    return this.http
      .get(`http://localhost:8080/auth/me`, { withCredentials: true })
      .pipe(map((r) => API.UserSchema.nullable().parse(r)));
  }
}
