import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { z } from 'zod';
import { environment } from '../environments/environment';

const IdSchema = z.object({ id: z.string() });

@Injectable({ providedIn: 'root' })
export class ImageService {
  private http = inject(HttpClient);

  uploadImage(formData: FormData): Observable<z.infer<typeof IdSchema>> {
    return this.http
      .post(`${environment.apiUrl}/images`, formData, { withCredentials: true })
      .pipe(map((r) => IdSchema.parse(r)));
  }
}
