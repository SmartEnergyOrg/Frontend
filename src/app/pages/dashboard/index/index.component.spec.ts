import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {BehaviorSubject, of} from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Widget } from 'src/app/models/widget.model';
import { ModelMapper } from 'src/app/shared/mapping/model.mapper';
import { WidgetService } from 'src/app/shared/widget/widget.service';

import { IndexComponent } from './index.component';
import {Graph} from "../../../models/graph.model";
import {DataPoint} from "../../../models/data-point.model";

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  let dummyModelMapper: jasmine.SpyObj<ModelMapper>;
  let dummyWidgetService: jasmine.SpyObj<WidgetService>;

  let widgetList = [];
  beforeEach(async () => {
    dummyModelMapper = jasmine.createSpyObj('ModelMapper', ['mapToWidget']);
    dummyWidgetService = jasmine.createSpyObj('WidgetService', ['getAll','connect']);

    await TestBed.configureTestingModule({
//      imports: [RouterModule],
      declarations: [ IndexComponent ],
      providers:[
        {provide: WidgetService, useValue: dummyWidgetService},
        {provide: ModelMapper, useValue: dummyModelMapper}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    //Dummydata
    let graph:Graph = {id: 1, interval:1400, type: "bar", data: new BehaviorSubject<DataPoint[]>([]), color: "#000000", query: "Query", last: new BehaviorSubject<DataPoint|null>(null)};
    let LineGraph:Graph = {id: 2, interval:1400, type: "line", data: new BehaviorSubject<DataPoint[]>([]), color: "#000000", query: "Query", last: new BehaviorSubject<DataPoint|null>(null)};
    let SingleGraph:Graph = {id: 3, interval:1400, type: "SingleStat", data: new BehaviorSubject<DataPoint[]>([]), color: "#000000", query: "Query", last: new BehaviorSubject<DataPoint|null>(null)};

    let element1 = new Widget(1, 'Grafiek', 1, 'Ixon', [graph, LineGraph]);
    let element2 = new Widget(1, 'Grafiek', 1, 'Ixon', [SingleGraph]);
    widgetList = [element1, element2];

    dummyWidgetService.getAll.and.returnValue(of({result: widgetList}));

    fixture.detectChanges();
  });

  it('Index component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('IndexComponent should show an list of widgets', ()=>{
    expect(component.widgets.length).toEqual(2);
    expect(dummyWidgetService.connect).toHaveBeenCalled();
  })
});
