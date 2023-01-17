import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { WeatherService } from './weather.service';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  let dummyWeatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    dummyWeatherService = jasmine.createSpyObj('WeatherService', ['getWeather']);
    
    await TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers:[
        {provide: WeatherService, useValue: dummyWeatherService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
