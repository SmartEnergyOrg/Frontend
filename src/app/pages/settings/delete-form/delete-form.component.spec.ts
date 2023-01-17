import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { WidgetService } from 'src/app/shared/widget/widget.service';

import { DeleteFormComponent } from './delete-form.component';

describe('DeleteFormComponent', () => {
  let component: DeleteFormComponent;
  let fixture: ComponentFixture<DeleteFormComponent>;
  
  let dummyRouter: jasmine.SpyObj<Router>;
  let dummyWidgetService: jasmine.SpyObj<WidgetService>;
  let dummyActivatedRouter: jasmine.SpyObj<ActivatedRoute>;
  
  let router: ActivatedRoute
  beforeEach(async () => {
    //dummyActivatedRouter = jasmine.createSpyObj('ActivatedRoute', ['params']);
    dummyRouter = jasmine.createSpyObj('Router', ['navigateByUrl', 'params']);
    dummyWidgetService = jasmine.createSpyObj('WidgetService', ['getById', 'update', 'create']);

    await TestBed.configureTestingModule({
      imports: [],
      declarations: [ DeleteFormComponent ],
      providers: [
        {provide: WidgetService, useValue: dummyWidgetService},
        {provide: Router, useValue: dummyRouter},
        { provide: ActivatedRoute, useValue: {
          params: of(
            convertToParamMap(
              {
                id: "12349876"
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
});
