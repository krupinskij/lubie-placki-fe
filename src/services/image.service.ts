import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { z } from 'zod';
import { environment } from '@environments/environment';
import { NotificationService } from './notification.service';
import { getErrorMessage } from '@utils';

const IdSchema = z.object({ id: z.string() });

@Injectable({ providedIn: 'root' })
export class ImageService {
  private http = inject(HttpClient);
  private notificationService = inject(NotificationService);

  uploadImage(formData: FormData): Observable<z.infer<typeof IdSchema>> {
    return this.http
      .post(`${environment.apiUrl}/images`, formData, { withCredentials: true })
      .pipe(
        catchError((err) => {
          this.notificationService.addMessage(getErrorMessage(err));
          return throwError(() => new Error(err));
        })
      )
      .pipe(map((r) => IdSchema.parse(r)));
  }
}
