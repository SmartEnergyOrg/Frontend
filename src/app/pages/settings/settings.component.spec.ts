import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from 'src/app/shared/widget/widget.service';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let dummyWidgetService: jasmine.SpyObj<WidgetService>;

  beforeEach(async () => {
    dummyWidgetService = jasmine.createSpyObj('WidgetService', ['getAll','subscribe']);
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
    let list:Widget[] = [element1, element2];

    dummyWidgetService.getAll.and.returnValue(of(list));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Component should have a list of widgets', ()=>{
    const list = component.widgets;
    component.ngOnInit();
    expect(component.widgets.length).toEqual(2);
  });
});
