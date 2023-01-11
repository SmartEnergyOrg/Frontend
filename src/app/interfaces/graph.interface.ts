import { DataPoint} from "../models/data-point.model";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

export interface IGraph {
  id?: number;
  type: string | undefined;
  query: string;
  interval: number;
  color: string;
  data: BehaviorSubject<DataPoint[] | []>;
}
