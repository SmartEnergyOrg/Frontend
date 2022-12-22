import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Widget } from 'src/app/models/widget.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WidgetService {
  private readonly apiUrl = environment.api_url;

  constructor(private readonly httpClient: HttpClient) {}

  getAll() {
    console.log('Get all widgets');
    return this.httpClient.get<any>(this.apiUrl + '/api/widgetsConfig');
  }

  // waarom is het nu .get<any> we weten toch dat het een widget is?
  getWidgetById(id: number) {
    console.log('Get all widgets');
    return this.httpClient.get<any>(`${this.apiUrl}/api/widgetsConfig/${id}`);
  }

  // de parameter moet widget id zijn
  getDataOfWidget(widget: Widget) {
    console.log(`Get data of widget with id ${widget.id}`);
    return this.httpClient.get<any>(
      `${this.apiUrl}/api/widgetsConfig/poll/${widget.id}`
    );
  }
}
