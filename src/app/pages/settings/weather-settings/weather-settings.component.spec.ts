import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { WeatherConfig, WeatherModel } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/shared/nav/weather.service';

import { WeatherSettingsComponent } from './weather-settings.component';

describe('WeatherSettingsComponent', () => {
  let component: WeatherSettingsComponent;
  let fixture: ComponentFixture<WeatherSettingsComponent>;
  let dummyWeatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    dummyWeatherService = jasmine.createSpyObj('WeatherService', ['getConfig', 'connectWeatherPlace']);
    await TestBed.configureTestingModule({
      imports: [RouterModule, ReactiveFormsModule, FormsModule],
      declarations: [ WeatherSettingsComponent ],
      providers: [
        {provide: WeatherService, useValue: dummyWeatherService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherSettingsComponent);
    component = fixture.componentInstance;
    
    let config: WeatherConfig= { name: "Rotterdam", country: "Netherlands", lat: 1, lon: 2};
    dummyWeatherService.getConfig.and.returnValue(of(config));

    fixture.detectChanges();
  });

  it('should create', () => {
    

    expect(component).toBeTruthy();
  });
});
