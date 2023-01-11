import { IDataPoint } from '../interfaces/data-point.interface';

export class DataPoint implements IDataPoint {
  measurement: string; // name:unit
  value: number;
  time: Date;

  constructor(measurement: string, value: number, time: Date) {
    this.measurement = measurement;
    this.value = value;
    this.time = time;
  }
}
