import { IWidget } from '../interfaces/widget.interface';
import { Graph } from './graph.model';

export class Widget implements IWidget {
  id?: number;
  title: string;
  position: number;
  icon: string; // URL to icon
  graphs: Graph[];
  errors: WidgetError[] = [];

  constructor(
    id: number,
    title: string,
    position: number,
    icon: string,
    graphs: Graph[]
  ) {
    this.id = id;
    this.title = title;
    this.position = position;
    this.icon = icon;
    this.graphs = graphs;
  }
}

export class WidgetError{
  subject: string;
  message: string;

  constructor(subject: string, message: string){
    this.subject = subject;
    this.message = message;
  }
}