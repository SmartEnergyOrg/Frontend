import { DataPoint } from "src/app/models/data-point.model";
import { Graph } from "src/app/models/graph.model";
import { Widget } from "src/app/models/widget.model";

export class ModelMapper {

  public mapToWidget(response: any) {
    return new Widget(
      response.WidgetId,
      response.Title,
      response.Position,
      response.Icon,
      this.mapToGraph(response.Graphs)
    )
  }

  public mapToGraph(response: any[]): Graph[] {
    return response.map(result => new Graph(
      result.GraphId,
      result.Type,
      result.Query,
      result.Interval,
      result.Color
    ))
  }

  public mapToData(response: any[]): DataPoint[] {
    return response.map(result => new DataPoint(
      result._measurement,
      result._value,
      result._time,
    ))
  }
}
