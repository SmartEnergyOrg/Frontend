export interface IDataPoint {
  measurement: string; // name:unit
  unit: string;
  value: number;
  time: Date;
}
