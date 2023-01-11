import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IGraph } from '../interfaces/graph.interface';
import { DataPoint } from './data-point.model';
export class Graph implements IGraph {
  id: number;
  type: string;
  query: string;
  interval: number;
  color: string;
  data: BehaviorSubject<DataPoint[] | []> = new BehaviorSubject<
    DataPoint[] | []
  >([]);

  constructor(
    id: number,
    type: string,
    query: string,
    interval: number,
    color: string
  ) {
    this.id = id;
    this.type = type;
    this.query = query;
    this.interval = interval;
    this.color = color;
  }
}
