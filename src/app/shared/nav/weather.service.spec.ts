import {WeatherService} from "./weather.service";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {ModelMapper} from "../mapping/model.mapper";
import {WidgetService} from "../widget/widget.service";
import {BehaviorSubject, of} from "rxjs";
import {WeatherConfig, WeatherModel} from "../../models/weather.model";

describe('Weatherservice', ()=>{

  let service: WeatherService;
  let dummyHttpService: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    dummyHttpService = jasmine.createSpyObj('HttpClient', ['post', 'put', 'delete', 'get']);

    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: dummyHttpService},
      ]
    });
    dummyHttpService.get.and.returnValue(of({result: undefined}))
    service = TestBed.inject(WeatherService);
  })

  it('Weatherservice should be created.', () => {
    expect(service).toBeTruthy();
  });

  it('Weather config update', () => {
    dummyHttpService.put.and.returnValue(of({status: 200, result: {name: "Town of Rotterdam", lon: 1, lat: 2, country: "United states"}}));

    let config: WeatherConfig = {name: "Town of Rotterdam", lon: 1, lat: 2, country: "United states"};

    service.update(config).subscribe((result:any)=>{
      expect(result.name).toEqual("Town of Rotterdam");
      expect(result.country).toEqual("United states");
      expect(result.lon).toEqual(1);
      expect(result.lat).toEqual(2);
    });
  });

  it('Update has failed.', () => {
    dummyHttpService.put.and.returnValue(of({status: 401, result: false}));

    let config: WeatherConfig = {name: "Town of Rotterdam", lon: 1, lat: 2, country: "United states"};

    service.update(config).subscribe((result:any)=>{
      expect(result).toBeFalse();
    });
  });

  it('Get weather config.', () => {
    dummyHttpService.get.and.returnValue(of({status: 200, result: {name: "Town of Rotterdam", lon: 1, lat: 2, country: "United states"}}));

    service.getConfig().subscribe((result:any)=>{
      expect(result.name).toEqual("Town of Rotterdam");
      expect(result.country).toEqual("United states");
      expect(result.lon).toEqual(1);
      expect(result.lat).toEqual(2);
    });
  });
  it('No weather config was found.', () => {
    dummyHttpService.get.and.returnValue(of({status: 401, result: undefined}));

    service.getConfig().subscribe((result:any)=>{
      expect(result).toEqual(undefined);
    });
  });

  it('Assign weather config to behavior subject', () => {
    let config: WeatherConfig = {name: "Town of Rotterdam", lon: 1, lat: 2, country: "United states"};

    service.assignToConfig(config);

    expect(service.currentWeatherConfig.value?.name).toEqual("Town of Rotterdam");
    expect(service.currentWeatherConfig.value?.lon).toEqual(1);
    expect(service.currentWeatherConfig.value?.lat).toEqual(2);
    expect(service.currentWeatherConfig.value?.country).toEqual("United states");
  });

  it('Assign weather to behavior subject', () => {
    let weather: WeatherModel = {main: { temp: 22 }, name: "Auckland", weather: [{main: "rain", description: "long tormenting rain", icon: "20a"}], wind: {deg: 123, speed: 3.7}};

    service.assignToWeather(weather);

    expect(service.currentWeather.value?.name).toEqual("Auckland");
    expect(service.currentWeather.value?.main.temp).toEqual(22);
    expect(service.currentWeather.value?.weather.length).toEqual(1);
    expect(service.currentWeather.value?.wind).toBeTruthy();
  });
  it('Get current weather', () => {
    let weather: WeatherModel = {main: { temp: 22 }, name: "Auckland", weather: [{main: "rain", description: "long tormenting rain", icon: "20a"}], wind: {deg: 123, speed: 3.7}};

    service.currentWeather = new BehaviorSubject<WeatherModel | undefined>(weather);

    let result = service.getWeather().value;

    expect(result?.wind).toBeTruthy();
    expect(result?.main).toBeTruthy();
    expect(result?.name).toEqual("Auckland");
    expect(result?.wind).toBeTruthy();
  });

  it('Get list of cities based on searchterm', () => {
    let weatherList: WeatherConfig[] = [
      {name: "Town of Rotterdam", lon: 1, lat: 2, country: "US"},
      {name: "Rotterdam", lon: 13, lat: 21, country: "NL"},
      {name: "Rotterdam", lon: 31, lat: 12, country: "DE"}
    ]

    dummyHttpService.get.and.returnValue(of(weatherList));

    let result = service.connectWeatherPlace("Rotterdam");

    result.subscribe((result)=>{
      expect(result.length).toEqual(3);
      expect(result[0].name).toEqual("Town of Rotterdam");
      expect(result[1].name).toEqual("Rotterdam");
      expect(result[2].name).toEqual("Rotterdam");
      expect(result[0].country).toEqual("US");
      expect(result[1].country).toEqual("NL");
      expect(result[2].country).toEqual("DE");
    });
  });

  it('Get weather based on lat. and lot. values', () => {
    let weatherConfig = {name: "Rotterdam", lon: 13, lat: 21, country: "NL"};
    let weather: WeatherModel = {
      main: { temp: 10 },
      name: "Rotterdam",
      weather: [{main: "rain", description: "long tormenting rain", icon: "20a"}],
      wind: {deg: 92, speed: 8.7}};

    dummyHttpService.get.and.returnValue(of(weather));

    service.connectOpenWeather(weatherConfig.lat, weatherConfig.lon).subscribe((result)=>{
      expect(result).toBeTruthy();
      expect(result.main.temp).toEqual(10);
      expect(result.name).toEqual("Rotterdam");
      expect(result.wind).toBeTruthy();
      expect(result.weather.length).toEqual(1);
    });
  });

})
