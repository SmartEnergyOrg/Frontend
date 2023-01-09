import { Data } from "./data.model"
export class Graph {
  id: number
  type: string | undefined
  query: string
  interval: number
  color: string
  data: Data

  constructor(
    id: number,
    type: string | undefined,
    query: string,
    interval: number,
    color: string,
    data: Data
  ) {
    this.id = id
    this.type = type
    this.query = query
    this.interval = interval
    this.color = color
    this.data = data
  }
}
