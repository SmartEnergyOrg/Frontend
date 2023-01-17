import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Widget } from 'src/app/models/widget.model';

import { WidgetComponent } from './widget.component';
import { WidgetService } from './widget.service';
import {DataPoint} from "../../models/data-point.model";
import {BehaviorSubject} from "rxjs";

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;
  let dummyWidgetService: jasmine.SpyObj<WidgetService>;
  let dummyWidget: Widget;

  beforeEach(async () => {

    dummyWidgetService = jasmine.createSpyObj('WidgetService', ['getAll']);
    dummyWidget = new Widget(1, 'Graph', 1, 'None', []);

    await TestBed.configureTestingModule({
      declarations: [ WidgetComponent ],
      providers:[
        {provide: WidgetService, useValue: dummyWidgetService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
    component.widget = dummyWidget;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The widget is not singlestat', () => {
    const widget: Widget = {
      errors: [],
      icon: "Icon",
      id: 1,
      position: 1,
      title: "Garage verbruik",
      graphs:[
        {
          interval: 1600,
          id: 1,
          last: new BehaviorSubject<DataPoint | null>({
            unit: "kwn",
            time: new Date(),
            value: 12000,
            measurement: "Meters"
          }),
          color: "#000000",
          query: "Quert",
          data: new BehaviorSubject<DataPoint[] | []>([]),
          type: "line"
        }
      ]
    };
    component.widget = widget;

    component.ngOnInit();

    expect(component.isSingleStat).toBeFalse();
  });

  it('The widget will be loaded correctly, without any problems.', () => {
    const widget: Widget = {
      errors: [],
      icon: "Icon",
      id: 1,
      position: 1,
      title: "Garage verbruik",
      graphs:[
        {
          interval: 1600,
          id: 1,
          last: new BehaviorSubject<DataPoint | null>({
            unit: "kwn",
            time: new Date(),
            value: 12000,
            measurement: "Meters"
          }),
          color: "#000000",
          query: "Quert",
          data: new BehaviorSubject<DataPoint[] | []>([]),
          type: "line"
        }
      ]
    };
    component.chart?.destroy();
    component.widget = widget;

    component.ngAfterViewInit();

    expect(component.chart).toBeTruthy()
  });
});
