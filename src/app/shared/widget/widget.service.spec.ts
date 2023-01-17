import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ModelMapper } from '../mapping/model.mapper';

import { WidgetService } from './widget.service';
import {Widget} from "../../models/widget.model";
import {Graph} from "../../models/graph.model";
import {BehaviorSubject, of} from "rxjs";
import {DataPoint} from "../../models/data-point.model";
import {WidgetBackend, WidgetCreateBackendModel} from "../../models/widget.backend-model";
import {GraphBackend} from "../../models/graph.backend-model";

describe('WidgetService', () => {
  let service: WidgetService;
  let dummyHttpService: jasmine.SpyObj<HttpClient>;
  let dummyMapper: jasmine.SpyObj<ModelMapper>;
  let widgetList: any[] = [];

  beforeEach(async () => {
    dummyHttpService = jasmine.createSpyObj('HttpClient', ['post', 'put', 'delete', 'get'])
    dummyMapper = jasmine.createSpyObj('ModelMapper', ['mapWidgetToApi']);
    await TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: dummyHttpService},
        {provide: ModelMapper, useValue: dummyMapper }
      ]
    });
    let graph:Graph = {id: 1, interval:1400, type: "bar", data: new BehaviorSubject<DataPoint[]>([]), color: "#000000", query: "Query", last: new BehaviorSubject<DataPoint|null>(null)};
    let LineGraph:Graph = {id: 2, interval:1400, type: "line", data: new BehaviorSubject<DataPoint[]>([]), color: "#000000", query: "Query", last: new BehaviorSubject<DataPoint|null>(null)};
    let SingleGraph:Graph = {id: 3, interval:1400, type: "SingleStat", data: new BehaviorSubject<DataPoint[]>([]), color: "#000000", query: "Query", last: new BehaviorSubject<DataPoint|null>(null)};
    let element1 = new Widget(1, 'Grafiek', 1, 'Ixon', [graph, LineGraph]);
    let element2 = new Widget(2, 'Grafiek2', 1, 'Ixon', [SingleGraph]);
    widgetList = [element1, element2];


    service = TestBed.inject(WidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();

  });

  it('Creation of widget', () => {
    dummyHttpService.post.and.returnValue(of({result: widgetList[0], message: "succesfully added widget"}));
    dummyMapper.mapWidgetToApi.and.returnValue(widgetList[0]);

    const result = service.create(widgetList[0]);

    result.subscribe((res:any)=> {
      expect(res.message).toEqual("succesfully added widget")
    })
  });

  it('Update of widget', () => {
    dummyHttpService.put.and.returnValue(of( "succesfully updated widget"));
    dummyMapper.mapWidgetToApi.and.returnValue(widgetList[0]);

    const result = service.update(widgetList[0]);

    result.subscribe((res:any)=> {
      expect(res).toEqual("succesfully updated widget")
    });
  });

  it('Deletion of widget', () => {
    dummyHttpService.delete.and.returnValue(of( "succesfully deleted the widget"));

    const result = service.delete(widgetList[0]);

    result.subscribe((res:any)=> {
      expect(res).toEqual("succesfully deleted the widget")
    });
  });

  it('Get all widgets', () => {
    dummyHttpService.get.and.returnValue(of({ result: widgetList}));

    const result = service.getAll();

    result.subscribe((res:any)=> {
      expect(res.result.length).toEqual(2);
      expect(res.result[0].id).toEqual(1);
      expect(res.result[1].id).toEqual(2);
    });
  });

  it('Get widget by id', () => {
    dummyHttpService.get.and.returnValue(of({ result: widgetList[1]}));

    const result = service.getAll();

    result.subscribe((res:any)=> {
      expect(res.result.id).toEqual(2);
      expect(res.result.title).toEqual("Grafiek2");
    });
  });
});
