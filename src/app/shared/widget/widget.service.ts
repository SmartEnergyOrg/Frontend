import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, throwError} from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { environment } from 'src/environments/environment';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root',
})
export class WidgetService {

  private readonly SERVER_API_URL = environment.SERVER_API_URL;
  private readonly socket = io("wss://localhost:9400");


  constructor(private readonly httpClient: HttpClient) { }

  getAll() {
    console.log('Get all widgets');
    return this.httpClient.get<any>(this.SERVER_API_URL + '/api/widgets');
  }

  getWidgetById(id: number) {
    console.log(`${WidgetService.name} getWidgetById(${id}) called`);

    return this.httpClient.get<any>(
      `${this.SERVER_API_URL}/api/widgets/${id}`
    );
  }

  getDataOfWidget(widget: Widget) {
    console.log(`${WidgetService.name} getDataOfWidget called`);
    console.log(widget);

    return this.httpClient.get<any>(`${this.SERVER_API_URL}/api/widgets/poll/${widget.id}?range=1h&steps=1m`);
  }

  addWidget(widget: any) {
    console.log(`${WidgetService.name} addWidget called`);
    console.log(widget);

    const endpoint = `${environment.SERVER_API_URL}/api/widgets`;

    return this.httpClient.post(endpoint, widget)
    // return this.httpClient.post<number>(endpoint, widget).pipe(
    //   map((result) => {
    //     console.log(result);
    //     return result;
    //   }),
    //   catchError(this.handleError)
    // );
  }

  updateWidget(widget: Widget): Observable<string> {
    console.log(`${WidgetService.name} updateWidget called`);
    console.log(widget);

    const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    const endpoint = `${environment.SERVER_API_URL}/api/widgets/${widget.id}`;

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
    console.log(error);

    const errorResponse = {
      type: 'error',
      message: error.error.message || error.message,
    };
    return throwError(errorResponse);
  }

  // updateWidgetPosition(id: number, widget: Widget) {
  //   return this.httpClient.put<Widget>(
  //     `${this.apiUrl}/api/widgets/position/${id}`,
  //     widget
  //   );
  // }

  //The connectToSocket handles the connection to the socket event.
  //It receives a widget as parameter
  //It will return a observable
  //As parameter, will the method receive a object with the widget configuration
  //The receiveSocketPayload method will handle the receive of the payload.
  // TODO Widget object is subject to change.
  connectToSocket(widget: Widget){
    this.socket.emit('getGraph', (widget));
  }

  //The receiveSocketPayload method handles the payload of the socket connection
  //When it receives new data from the server
  //This method will create widgetSubject, every time it is called upon.
  //It will then return observable of this behavioursubject.
  //Everytime a new event has been called it will update the behaviour subject
  // TODO Any will need to be changed to appropiate object.
  receiveSocketPayload(widget: Widget):Observable<any>{
    const WidgetSubject = new BehaviorSubject<any>(undefined);
    this.socket.on('getGraph', (payload)=>{
      console.log(this.socket.connected);
      WidgetSubject.next(payload);
    })
    return WidgetSubject.asObservable();
  }
}
