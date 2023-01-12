import { BehaviorSubject } from 'rxjs';
import { DataPoint } from '../models/data-point.model';

export interface IGraph {
  id?: number;
  type: string | undefined;
  query: string;
  interval: number;
  color: string;
  data: BehaviorSubject<DataPoint[] | []>;
}
