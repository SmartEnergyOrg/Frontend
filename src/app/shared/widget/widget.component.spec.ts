import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { Widget } from 'src/app/models/widget.model';

import { WidgetComponent } from './widget.component';
import { WidgetService } from './widget.service';

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
});
