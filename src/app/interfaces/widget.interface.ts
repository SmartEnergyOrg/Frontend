import { Graph } from '../models/graph.model';

export interface IWidget {
  id?: number;
  title: string;
  position: number;
  icon: string; // URL to icon
  graphs: Graph[];
}
