import { IDataPoint } from '../interfaces/data-point.interface';

export class DataPoint implements IDataPoint {
  measurement: string; // name:unit
  unit: string;
  value: number;
  time: Date;

  constructor(measurement: string, unit: string, value: number, time: Date) {
    this.measurement = measurement;
    this.unit = unit;
    this.value = value;
    this.time = time;
  }
}
