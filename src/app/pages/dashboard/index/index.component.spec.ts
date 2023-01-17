import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Widget } from 'src/app/models/widget.model';
import { ModelMapper } from 'src/app/shared/mapping/model.mapper';
import { WidgetService } from 'src/app/shared/widget/widget.service';

import { IndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  let dummyModelMapper: jasmine.SpyObj<ModelMapper>;
  let dummyWidgetService: jasmine.SpyObj<WidgetService>;

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
    //Voor tijdens de ngOnInit.
    let element1 = new Widget(1, 'Grafiek', 1, 'Ixon', []);
    let element2 = new Widget(1, 'Grafiek', 1, 'Ixon', []);
    let list:Widget[] = [element1, element2];

    dummyWidgetService.getAll.and.returnValue(of(list));

    fixture.detectChanges();
  });

  it('should create', () => {
    

    
    expect(component).toBeTruthy();
  });
});
