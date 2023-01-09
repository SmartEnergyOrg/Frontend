import { DataPoint } from "./data-point.model"
export class Graph {
  id: number
  type: string
  query: string
  interval: number
  color: string
  data: DataPoint[]

  constructor(
    id: number,
    type: string,
    query: string,
    interval: number,
    color: string,
    data: DataPoint[]
  ) {
    this.id = id
    this.type = type
    this.query = query
    this.interval = interval
    this.color = color
    this.data = data
  }
}
