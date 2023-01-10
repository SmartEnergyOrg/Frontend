import { Graph } from "./graph.model";

export class Widget {
  id: number
  title: string
  position: number
  icon: string // MDI icon
  graphs: Graph[]

  constructor(
    id: number,
    title: string,
    position: number,
    icon: string,
    graphs: Graph[]
  ) {
    this.id = id
    this.title = title
    this.position = position
    this.icon = icon
    this.graphs = graphs
  }
}
