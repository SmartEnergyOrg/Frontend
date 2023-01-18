import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { WeatherService } from './weather.service';
import {BehaviorSubject, of} from "rxjs";
import { WeatherModel } from 'src/app/models/weather.model';
import {OpenUvService} from "./uv.service";
import {OpenUvData} from "../../models/uv-data.model";

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  let dummyWeatherService: jasmine.SpyObj<WeatherService>;
  let dummyUvService: jasmine.SpyObj<OpenUvService>;

  beforeEach(async () => {
    dummyWeatherService = jasmine.createSpyObj('WeatherService', ['getWeather', 'getConfig']);
    dummyUvService = jasmine.createSpyObj('OpenUvService', ['getData']);

    await TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      providers:[
        {provide: WeatherService, useValue: dummyWeatherService },
        {provide: OpenUvService, useValue: dummyUvService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    dummyWeatherService.getConfig.and.returnValue(of());
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
    const uvResult:OpenUvData = {result: {ozone: 0, safe_exposure_time: 0, uv: 0, uv_max: 0, uv_time: ""}};

    dummyWeatherService.getWeather.and.returnValue(behavior)
    dummyUvService.getData.and.returnValue(Promise.resolve(uvResult));

    //Act
    component.ngOnInit();

    //Assert
    expect(component.ObservedWeather$.value?.name).toEqual("Auckland");
    expect(component.ObservedWeather$.value?.wind.deg).toEqual(180);
    expect(component.ObservedWeather$.value?.main.temp).toEqual(16);
    expect(component.ObservedWeather$.value?.weather[0].main).toEqual('Dry sun');
  })
});
