import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { WidgetService } from 'src/app/shared/widget/widget.service';

import { FormComponent } from './form.component';
import {Widget} from "../../../models/widget.model";

describe('form-component - Widget creation', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  let dummyRouter: jasmine.SpyObj<Router>;
  let dummyWidgetService: jasmine.SpyObj<WidgetService>;

  beforeEach(async () => {

    //Mock methods
    //dummyActivatedRouter = jasmine.createSpyObj('ActivatedRoute', []);
    dummyRouter = jasmine.createSpyObj('Router', ['navigate']);
    dummyWidgetService = jasmine.createSpyObj('WidgetService', ['getById', 'update', 'create']);

    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [ ReactiveFormsModule, FormsModule],
      providers:[
        {provide: ActivatedRoute, useValue: {
          paramMap: of(
            convertToParamMap(
              {
                id: undefined
              }))
        }},
        {provide: Router, useValue: dummyRouter},
        {provide: WidgetService, useValue: dummyWidgetService},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Component should exist', () => {
    expect(component).toBeTruthy();
  });


  it("Component should give update form when navigating Id", ()=>{
    expect(component.componentExists).toBeFalse();
  })

  it('The app should follow the widget creation process.', ()=>{
    //Arrange
    dummyWidgetService.create.and.returnValue(of("Dummy data"));
    const newWidget = new Widget(2, "Gewijzigde widget", 1, "Icon", []);
    component.widget = newWidget;

    //Act
    component.onSubmit();
    //Assert
    expect(dummyRouter.navigate).toHaveBeenCalled();
    expect(component.componentExists).toBeFalse();
  })

});

describe('form-component - Widget creation', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  let dummyRouter: jasmine.SpyObj<Router>;
  let dummyWidgetService: jasmine.SpyObj<WidgetService>;

  beforeEach(async () => {

    //Mock methods
    //dummyActivatedRouter = jasmine.createSpyObj('ActivatedRoute', []);
    dummyRouter = jasmine.createSpyObj('Router', ['navigate']);
    dummyWidgetService = jasmine.createSpyObj('WidgetService', ['getById', 'update', 'create']);

    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [ ReactiveFormsModule, FormsModule],
      providers:[
        {provide: ActivatedRoute, useValue: {
            paramMap: of(
              convertToParamMap(
                {
                  id: "12349876"
                }))
          }},
        {provide: Router, useValue: dummyRouter},
        {provide: WidgetService, useValue: dummyWidgetService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("Component should give update form when navigating Id", ()=>{
    expect(component.componentExists).toBeTrue();
  })

  it('The app should follow the update process', ()=>{
//Arrange
    dummyWidgetService.update.and.returnValue(of("Dummy data"));
    const newWidget = new Widget(2, "Gewijzigde widget", 1, "Icon", []);
    component.widget = newWidget;
    component.componentExists = true;

    //Act
    component.onSubmit();
    //Assert
    expect(component.componentExists).toBeTrue();
    expect(dummyRouter.navigate).toHaveBeenCalled();
  })
})
