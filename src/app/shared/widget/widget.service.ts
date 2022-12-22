import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private readonly SERVER_API_URL = environment.SERVER_API_URL;

  constructor(private readonly httpClient: HttpClient) {}

  getAll() {
    console.log('Get all widgets');
    return this.httpClient.get<any>(this.SERVER_API_URL + '/api/widgetsConfig');
  }

  // waarom is het nu .get<any> we weten toch dat het een widget is?
  getWidgetById(id: number) {
    console.log('Get all widgets');
    return this.httpClient.get<any>(
      `${this.SERVER_API_URL}/api/widgetsConfig/${id}`
    );
  }

  // de parameter moet widget id zijn
  getDataOfWidget(widget: Widget) {
    console.log(`Get data of widget with id ${widget.id}`);
    return this.httpClient.get<any>(
      `${this.SERVER_API_URL}/api/widgetsConfig/poll/${widget.id}`
    );
  }

  addWidget(widget: Widget): Observable<string> {
    console.log(`${WidgetService.name} addWidget called`);
    console.log(widget);

    const endpoint = `${environment.SERVER_API_URL}/api/widgetsConfig`;

    return this.httpClient.post<number>(endpoint, widget).pipe(
      map((result) => {
        console.log(result);
        return result;
      }),
      catchError(this.handleError)
    );
  }

  updateWidget(widget: Widget): Observable<string> {
    console.log(`${WidgetService.name} updateWidget called`);
    console.log(widget);

    const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    const endpoint = `${environment.SERVER_API_URL}/api/widgetsConfig/${widget.id}`;

    return this.httpClient
      .put<number>(endpoint, widget, { ...httpOptions })
      .pipe(
        map((result) => {
          console.log(result);
          return result;
        }),
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    // console.log(error);

    const errorResponse = {
      type: 'error',
      message: error.error.message || error.message,
    };
    return throwError(errorResponse);
  }
}
