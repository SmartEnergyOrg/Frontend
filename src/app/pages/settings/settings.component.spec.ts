import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from 'src/app/shared/widget/widget.service';

import { SettingsComponent } from './settings.component';
import {ModelMapper} from "../../shared/mapping/model.mapper";
import {WidgetBackend} from "../../models/widget.backend-model";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let dummyWidgetService: jasmine.SpyObj<WidgetService>;
  let dummyMapper: jasmine.SpyObj<ModelMapper>;

  let list: any[] = [];
  beforeEach(async () => {
    dummyWidgetService = jasmine.createSpyObj('WidgetService', ['getAll','subscribe']);
    dummyMapper = jasmine.createSpyObj('ModelMapper', ['mapToWidget']);
    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      providers: [
        {provide: WidgetService, useValue: dummyWidgetService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;

    //Voor tijdens de ngOnInit.
    let element1 = new Widget(1, 'Grafiek', 1, 'Ixon', []);
    let element2 = new Widget(2, 'Grafiek', 1, 'Ixon', []);
    let list2 = [element1, element2];
    list = [
      {WidgetId: 1, Icon: "Icon", Title: "DummyTitel", Position: 1, Graphs: []},
      {WidgetId: 2, Icon: "Icon2", Title: "DummyTitel2", Position: 2, Graphs: []}
    ];
    dummyWidgetService.getAll.and.returnValue(of({result: list}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component should have a list of widgets', ()=>{
    expect(component.widgets.length).toEqual(2);
  });
});
