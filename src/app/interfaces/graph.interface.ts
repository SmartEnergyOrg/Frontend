import { Data } from '../models/data.model';

export interface IGraph {
  id?: number;
  type: string | undefined;
  query: string;
  interval: number;
  color: string;
  data: Data;
}
