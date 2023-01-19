import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OpenUvData } from 'src/app/models/uv-data.model';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenUvService {
  constructor(private http: HttpClient) {}

  async getData(lat: number, lon: number): Promise<OpenUvData | undefined> {
    const url = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`;
    const apiKey = 'openuv-cuyafptld2ww8n0-io';
    const headers = {
      'x-access-token': apiKey,
    };
    return this.http
      .get<OpenUvData>(url, { headers })
      .pipe(catchError(() => of(undefined)))
      .toPromise();
  }
}
