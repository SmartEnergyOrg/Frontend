import { IWidget } from '../interfaces/widget.interface';
import { GraphBackend } from './graph.backend-model';
import { Graph } from './graph.model';
import { Widget } from './widget.model';

export class WidgetBackend {
  WidgetId?: number;
  Title: string;
  Position: number;
  Icon: string;

  constructor(
    widget: Widget
  ) {
    this.WidgetId = widget.id;
    this.Title = widget.title;
    this.Position = widget.position;
    this.Icon = widget.icon;
  }
}


export class WidgetCreateBackendModel{
  Widget: WidgetBackend;
  Graphs: GraphBackend[];

  constructor(widget: WidgetBackend, graphs: GraphBackend[]){
    this.Widget = widget;
    this.Graphs = graphs;
  }
}