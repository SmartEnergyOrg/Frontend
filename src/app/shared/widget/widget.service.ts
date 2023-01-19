import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { Widget, WidgetError } from 'src/app/models/widget.model';
import { environment } from 'src/environments/environment';
import { io } from 'socket.io-client';
import { ModelMapper } from '../mapping/model.mapper';
import { DataPoint } from 'src/app/models/data-point.model';
import { IWidget } from 'src/app/interfaces/widget.interface';
import { elements } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private readonly SERVER_API_URL = environment.SERVER_API_URL;
  private readonly SOCKET = io(environment.SOCKET_IO_URL);

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

    return this.httpClient.get<any>(`${this.SERVER_API_URL}/api/widgets/${id}`);
  }

  create(widget: any) {
    console.log(`${WidgetService.name} addWidget called`);
    console.log(widget);

    const endpoint = `${environment.SERVER_API_URL}/api/widgets`;

    return this.httpClient.post(
      endpoint,
      this.modelMapper.mapWidgetToApi(widget)
    );
  }

  update(widget: IWidget): Observable<string> {
    console.log(`${WidgetService.name} updateWidget called`);
    console.log(widget);

    const httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    const endpoint = `${environment.SERVER_API_URL}/api/widgets/${widget.id}`;

    return this.httpClient
      .put<any>(endpoint, this.modelMapper.mapWidgetToApi(widget), {
        ...httpOptions,
      })
      .pipe(
        map((result) => {
          console.log(result);
          return result;
        }),
        catchError(this.handleError)
      );
  }

  delete(widget: Widget): Observable<any> {
    const endpoint = `${environment.SERVER_API_URL}/api/widgets/${widget.id}`;
    // TODO: delete widget
    return this.httpClient.delete<any>(endpoint);
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
  private subscribe(widget: Widget) {
    console.log(`Subscribed to widget with ID ${widget.id}`);

    widget.graphs.forEach((graph) => {
      console.log(`-- Subscribed to graph with ID ${graph.id}`);

      this.SOCKET.emit(`subscribe`, { graphId: graph.id });
    });
  }

  // The getGraph method handles the payload of the socket connection
  // when it receives new data from the server
  // This method will create widgetSubject, every time it is called upon.
  // It will then return observable of this behavioursubject.
  // Everytime a new event has been called it will update the behaviour subject

  private getData(widget: Widget) {
    widget.graphs.forEach((graph) => {
      console.log(`-- Get data from graph with ID ${graph.id}`);

      const eventName = `pollWidget(${graph.id})`;
      this.SOCKET.on(eventName, (payload) => {
        console.log(
          `-- Received data from socket server from graph with ID ${graph.id}`
        );

        const data: DataPoint[] = this.modelMapper.mapToData(payload);
        console.log(data);
        graph.data.next(data);
      });

      //Error handling
      const errorEventName = 'error';
      this.SOCKET.on(errorEventName, (payload) => {
        if (
          payload.clientData.graphId != undefined &&
          payload.clientData.graphId == graph.id
        ) {
          // Received error is of the given graph
          widget.errors.push(
            new WidgetError(
              `Error just occured for graphId: ${graph.id}, is your query valid?`,
              payload.message
            )
          );
        }
      });
    });
  }
}
