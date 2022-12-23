import { ChartType } from "chart.js"
import { Graph } from "./graph.model";

export interface Widget {
  id?: number | undefined;
  dashboardId: number | undefined
  title: string | undefined;
  range: number | undefined;
  frequence: number | undefined
  // chartType: ChartType | undefined;
  isActive: boolean | undefined
  position: number | undefined
  graphs: Graph[] | undefined
  lastUpdated: Date | string | undefined
}
