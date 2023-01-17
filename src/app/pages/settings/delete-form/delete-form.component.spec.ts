import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { WidgetService } from 'src/app/shared/widget/widget.service';

import { DeleteFormComponent } from './delete-form.component';
import {ModelMapper} from "../../../shared/mapping/model.mapper";
import {Widget} from "../../../models/widget.model";

describe('DeleteFormComponent', () => {
  let component: DeleteFormComponent;
  let fixture: ComponentFixture<DeleteFormComponent>;

  let dummyRouter: jasmine.SpyObj<Router>;
  let dummyWidgetService: jasmine.SpyObj<WidgetService>;
  let dummyActivatedRouter: jasmine.SpyObj<ActivatedRoute>;
  let dummyMapper: jasmine.SpyObj<ModelMapper>;
  let router: ActivatedRoute
  beforeEach(async () => {
    //dummyActivatedRouter = jasmine.createSpyObj('ActivatedRoute', ['params']);
    dummyRouter = jasmine.createSpyObj('Router', ['navigateByUrl', 'params']);
    dummyWidgetService = jasmine.createSpyObj('WidgetService', ['getById', 'delete']);
    dummyMapper = jasmine.createSpyObj('ModelMapper', ['mapToWidget']);
    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ DeleteFormComponent ],
      providers: [
        {provide: WidgetService, useValue: dummyWidgetService},
        {provide: Router, useValue: dummyRouter},
        {provide: ModelMapper, useValue: dummyMapper},
        { provide: ActivatedRoute, useValue: {
          params: of(
            convertToParamMap(
              {
                id: 1
              }))
        }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFormComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('It should show the widget before removal',()=>{
    //Voor tijdens de ngOnInit.
    let element1 = {WidgetId: 1, Title:'Grafiek', Position: 1, Icon:'Ixon', Graphs:[]};
    dummyWidgetService.getById.and.returnValue(of({result: element1}));
    dummyMapper.mapToWidget.and.returnValue({id: 1, title:'Grafiek', position: 1, icon:'Ixon', graphs:[], errors: []});

    //Act
    component.loadInWidget(1);

    expect(component.widget.id).toEqual(1);
    expect(component.widget.icon).toEqual('Ixon');
    expect(component.widget.position).toEqual(1);
  })

  it('Should perform delete action',()=>{
    //Voor tijdens de ngOnInit
    component.widget = {id: 1, title:'Grafiek', position: 1, icon:'Ixon', graphs:[], errors: []};
    dummyWidgetService.delete.and.returnValue(of({message: "Great succes"}));

    //Act
    component.deleteWidget();

    //Assert
    expect(dummyRouter.navigateByUrl).toHaveBeenCalled();
  })
});
