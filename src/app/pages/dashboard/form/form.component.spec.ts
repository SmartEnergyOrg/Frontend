import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { WidgetService } from 'src/app/shared/widget/widget.service';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  let dummyRouter: jasmine.SpyObj<Router>;
  let dummyWidgetService: jasmine.SpyObj<WidgetService>;

  beforeEach(async () => {

    //Mock methods
    //dummyActivatedRouter = jasmine.createSpyObj('ActivatedRoute', []);
    dummyRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
    dummyWidgetService = jasmine.createSpyObj('WidgetService', ['getById', 'update', 'create']);

    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [ ReactiveFormsModule, FormsModule],
      providers:[
        {provide: ActivatedRoute, useValue: {
          paramMap: of(
            convertToParamMap(
              {
                UserId: "12349876"
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
