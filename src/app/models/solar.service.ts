import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Solar } from 'src/app/models/solar.model';


@Injectable({
  providedIn: 'root'
})
export class SolarService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAll(): Observable<any> {
    console.log("Get all solar measurements");
    return this.httpClient.get<any>("http://localhost:12345/api/powersources/solar");
  }

}
