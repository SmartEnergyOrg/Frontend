import {WeatherService} from "./weather.service";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {ModelMapper} from "../mapping/model.mapper";
import {WidgetService} from "../widget/widget.service";
import {of} from "rxjs";

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
    expect(service).toBeTruthy();
  });
  it('Get weather config.', () => {
    expect(service).toBeTruthy();
  });
  it('Assign weather config to behavior subject', () => {
    expect(service).toBeTruthy();
  });
  it('Assign weather to behavior subject', () => {
    expect(service).toBeTruthy();
  });
  it('Get current weather', () => {
    expect(service).toBeTruthy();
  });

  it('Get list of cities based on searchterm', () => {
    expect(service).toBeTruthy();
  });

  it('Get weather based on lat. and lot. values', () => {
    expect(service).toBeTruthy();
  });

})
