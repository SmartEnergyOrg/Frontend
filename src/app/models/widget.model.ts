import { IWidget } from '../interfaces/widget.interface';
import { Graph } from './graph.model';

export class Widget implements IWidget {
  id?: number;
  title: string;
  order: number;
  icon: string; // URL to icon
  graphs: Graph[];

  constructor(
    id: number,
    title: string,
    order: number,
    icon: string,
    graphs: Graph[]
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.icon = icon;
    this.graphs = graphs;
  }
}
