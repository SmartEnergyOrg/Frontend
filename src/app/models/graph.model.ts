import { ChartType } from "chart.js"

export class Graph {
  Name: string
  Type: ChartType
  Measurement: string
  Color: string

  constructor(
    Name: string,
    Type: ChartType,
    Measurement: string,
    Color: string
  ) {
    this.Name = Name
    this.Type = Type
    this.Measurement = Measurement
    this.Color = Color
  }
}
