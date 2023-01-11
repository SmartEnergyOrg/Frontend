import { IWidget } from '../interfaces/widget.interface';
import { GraphBackend } from './graph.backend-model';
import { Graph } from './graph.model';

export class WidgetBackend {
  WidgetId: number;
  Title: string;
  Position: number;
  Icon: string;
  Graphs: GraphBackend[];

  constructor(
    WidgetId: number,
    Title: string,
    Position: number,
    Icon: string,
    Graphs: GraphBackend[]
  ) {
    this.WidgetId = WidgetId;
    this.Title = Title;
    this.Position = Position;
    this.Icon = Icon;
    this.Graphs = Graphs;
  }
}
