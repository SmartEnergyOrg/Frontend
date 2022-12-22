import { Graph } from "./graph.model"

export class Widget {
  id: number
  dashboardId: number
  title: string
  range: string
  frequence: number
  isActive: boolean
  position: number = 0
  graphs: Graph[] = []

  constructor(
    id: number,
    dashboardId: number,
    title: string,
    range: string,
    frequence: number,
    isActive: boolean,
    position: number,
    graphs: Graph[]
  ) {
    this.id = id
    this.dashboardId = dashboardId
    this.title = title
    this.range = range
    this.frequence = frequence
    this.isActive = isActive
    this.position = position
    this.graphs = graphs
  }
}
