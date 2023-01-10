import { Graph } from '../models/graph.model';

export interface IWidget {
  id?: number;
  title: string;
  order: number;
  icon: string; // URL to icon
  graphs: Graph[];
}
