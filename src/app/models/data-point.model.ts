import {IData} from "../interfaces/data-point.interface";

export class DataPoint implements IData{
  measurement: string // name:unit
  value: number
  time: Date

  constructor(
    measurement: string,
    value: number,
    time: Date
  ) {
    this.measurement = measurement
    this.value = value
    this.time = time
  }
}
