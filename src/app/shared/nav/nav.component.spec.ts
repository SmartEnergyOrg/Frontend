import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { WeatherService } from './weather.service';
import {BehaviorSubject, of} from "rxjs";
import { WeatherModel } from 'src/app/models/weather.model';

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

  it('It should receive an weather as observables', ()=>{
    const weather: WeatherModel = {
      weather: [
        {
          main: 'Dry sun',
          description: 'A sunny day, but very dry',
          icon: "20s"
        }
      ],
      main: {
        temp: 16
      },
      wind: {
        deg: 180,
        speed: 6.8
      },
      name: 'Auckland'
    };
    const behavior = new BehaviorSubject<WeatherModel | undefined>(weather);
    dummyWeatherService.getWeather.and.returnValue(behavior)

    //Act
    component.ngOnInit();

    //Assert
    expect(component.ObservedWeather$.value?.name).toEqual("Auckland");
    expect(component.ObservedWeather$.value?.wind.deg).toEqual(180);
    expect(component.ObservedWeather$.value?.main.temp).toEqual(16);
    expect(component.ObservedWeather$.value?.weather[0].main).toEqual('Dry sun');
  })
});
