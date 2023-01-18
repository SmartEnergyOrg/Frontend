import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, of} from "rxjs";
import {WeatherService} from "../nav/weather.service";
import {ModelMapper} from "./model.mapper";
import {Graph} from "../../models/graph.model";
import {DataPoint} from "../../models/data-point.model";
import {IWidget} from "../../interfaces/widget.interface";

describe("Model mapper tests", ()=>{
  let service: ModelMapper;
  beforeEach(async () => {

    service = new ModelMapper();
  })

  it('Map graph to API', ()=>{
    let graph = [
      {GraphId: 1, Type: 'line', Query: "Query", Color: "#000000", Interval: 12000},
      {GraphId: 2, Type: 'line', Query: "Query", Color: "#000000", Interval: 12000},
    ]

    const result = service.mapToGraph(graph);

    expect(result[0].id).toEqual(1);
    expect(result[1].id).toEqual(2);

    expect(result[0].type).toEqual('line');
    expect(result[1].type).toEqual('line');

    expect(result[0].query).toEqual("Query");
    expect(result[1].query).toEqual("Query");

    expect(result[0].color).toEqual("#000000");
    expect(result[1].color).toEqual("#000000");

    expect(result[0].interval).toEqual(12000);
    expect(result[1].interval).toEqual(12000);
  });

  it('Map to Data', ()=>{
    let datapoint: any[] = [{_field: "kwh", _value: 120, _time: new Date(), _measurement: "uur"}];

    let result: DataPoint[] = service.mapToData(datapoint);

    expect(result[0].unit).toEqual("kwh");
    expect(result[0].measurement).toEqual("uur");
    expect(result[0].time).toBeTruthy();
    expect(result[0].value).toEqual(120);
  });

  it('Map graph to graphApi model', ()=>{
    let graphs: Graph[] = [{id: 1, type: 'line', last: new BehaviorSubject<DataPoint | null>(null), color: "#222222", data: new BehaviorSubject<DataPoint[] | []>([]), query: "Query", interval: 12000}];

    let result = service.mapGraphToApi(graphs);

    expect(result[0].Color).toEqual("#222222");
    expect(result[0].GraphId).toEqual(1);
    expect(result[0].Type).toEqual('line');
    expect(result[0].Interval).toEqual(12000);
    expect(result[0].Query).toEqual("Query");
  });

  it('Map widget to widgetAPI model', ()=>{
    let widget: IWidget = {graphs: [], icon: "20d", id: 0, position: 1, title: "Grafiek"};

    let result = service.mapWidgetToApi(widget);

    expect(result.Widget.WidgetId).toEqual(0);
    expect(result.Graphs.length).toEqual(0);
    expect(result.Widget.Title).toEqual("Grafiek");
    expect(result.Widget.Icon).toEqual("20d");
    expect(result.Widget.Position).toEqual(1);
  })

  it('Map to widget', ()=>{
    let widgetApi = {WidgetId: 1, Title: "Nieuwe widget", Icon: "pp1", Position: 3, Graphs: []};
    let result = service.mapToWidget(widgetApi);

    expect(result.id).toEqual(1);
    expect(result.icon).toEqual("pp1");
    expect(result.position).toEqual(3);
    expect(result.title).toEqual("Nieuwe widget");
    expect(result.graphs.length).toEqual(0);
    expect(result.errors).toBeTruthy();
  })
})
