import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { environment } from 'src/environments/environment';
import { io } from "socket.io-client";
import { ModelMapper } from '../mapping/model.mapper';
import { DataPoint } from 'src/app/models/data-point.model';
import { IWidget } from 'src/app/interfaces/widget.interface';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {

  private readonly SERVER_API_URL = environment.SERVER_API_URL;
  private readonly SOCKET = io("ws://localhost:9400");


  constructor(
    private readonly httpClient: HttpClient,
    private readonly modelMapper: ModelMapper
  ) {
    //this.connectToSocket();
  }

  getAll() {
    console.log('Get all widgets');
    return this.httpClient.get<any>(this.SERVER_API_URL + '/api/widgets');
  }

  getById(id: number) {
    console.log(`${WidgetService.name} getWidgetById(${id}) called`);

    return this.httpClient.get<any>(
      `${this.SERVER_API_URL}/api/widgets/${id}`
    );
  }

  create(widget: any) {
    console.log(`${WidgetService.name} addWidget called`);
    console.log(widget);

    const endpoint = `${environment.SERVER_API_URL}/api/widgets`;

    return this.httpClient.post(endpoint, widget)
  }

  update(widget: IWidget): Observable<string> {
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

  delete(widget: Widget): void {
    // TODO: delete widget
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log(error);

    const errorResponse = {
      type: 'error',
      message: error.error.message || error.message,
    };
    return throwError(errorResponse);
  }

  connect(widget: Widget) {
    this.subscribe(widget);
    this.getData(widget);
  }

  // The subscribeGetGraph handles the connection to the socket event.
  // It will return a observable
  // As parameter, will the method receive a object with the widget configuration
  // The receiveSocketPayload method will handle the receive of the payload.

  // TODO Widget object is subject to change.
  private subscribe(widget: Widget) {
    console.log(`Subscribed to widget with ID ${widget.id}`);

    (widget.graphs).forEach(graph => {
      console.log(`-- Subscribed to graph with ID ${graph.id}`);

      this.SOCKET.emit(`subscribe`, ({ graphId: graph.id }));
    })
  }

  // The getGraph method handles the payload of the socket connection
  // when it receives new data from the server
  // This method will create widgetSubject, every time it is called upon.
  // It will then return observable of this behavioursubject.
  // Everytime a new event has been called it will update the behaviour subject

  private getData(widget: Widget) {
    (widget.graphs).forEach(graph => {
      console.log(`-- Get data from graph with ID ${graph.id}`);

      const eventName = `pollWidget(${graph.id})`
      this.SOCKET.on(eventName, (payload) => {
        console.log(`-- Received data from socket server from graph with ID ${graph.id}`);

        const data: DataPoint[] = this.modelMapper.mapToData(payload);
        graph.data.next(data)
      })
    });
  }

  // Handles connection to socket.
  // Gives a console.log if connection has succeeded or failed
  // connectToSocket() {
  //   this.SOCKET.on('connect', () => {
  //     console.log(this.SOCKET.connected);

  //     if (this.SOCKET.connected) {
  //       console.log("Socket is connected");
  //       //Maybe automatic emit to subscribeGetGraphs

  //     } else {
  //       console.error("Socket connection has failed");
  //     }
  //   })
  // }

  // REPLACED BY SOCKET
  // getDataOfWidget(widget: Widget) {
  //   console.log(`${WidgetService.name} getDataOfWidget called`);
  //   console.log(widget);

  //   return this.httpClient.get<any>(`${this.SERVER_API_URL}/api/widgets/poll/${widget.id}?range=1h&steps=1m`);
  // }
}
