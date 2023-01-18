export class GraphBackend {
  GraphId: number | null;
  Type: string;
  Query: string;
  Interval: number;
  Color: string;

  constructor(
    GraphId: number | null,
    Type: string,
    Query: string,
    Interval: number,
    Color: string
  ) {
    this.GraphId = GraphId;
    this.Type = Type;
    this.Query = Query;
    this.Interval = Interval;
    this.Color = Color;
  }
}
