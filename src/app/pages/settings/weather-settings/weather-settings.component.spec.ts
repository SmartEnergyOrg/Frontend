import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import { of } from 'rxjs';
import { WeatherConfig, WeatherModel } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/shared/nav/weather.service';

import { WeatherSettingsComponent } from './weather-settings.component';

describe('WeatherSettingsComponent', () => {
  let component: WeatherSettingsComponent;
  let fixture: ComponentFixture<WeatherSettingsComponent>;
  let dummyWeatherService: jasmine.SpyObj<WeatherService>;
  let dummyRouter: jasmine.SpyObj<Router>;

  let CityList = [{name: "Auckland", country: "NZ", lat: 1, lon: 1},{name: "Auckland", country: "USA", lat: 123, lon: 221}];

  beforeEach(async () => {
    dummyWeatherService = jasmine.createSpyObj('WeatherService', ['getConfig','update', 'connectWeatherPlace', 'assignToConfig']);
    dummyRouter = jasmine.createSpyObj('Router', ['navigate']);
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

  it('A search should be performed when filling search field. It will return a list of cities', () => {
    //Arrange
    component.searchTerm = "Auckland";
    dummyWeatherService.connectWeatherPlace.and.returnValue(of(CityList));
    //Act

    component.searchPlace();
    //Assert

    expect(component.cityList.length).toEqual(2);
    expect(component.foundCity).toBeTrue();
  });

  it('When city is chosen, the list should be empty and city assigned to object.', () => {
    //Arrange
    component.searchTerm = "Auckland";
    dummyWeatherService.connectWeatherPlace.and.returnValue(of(CityList));
    //Act

    component.searchPlace();
    //Assert

    expect(component.cityList.length).toEqual(2);

    component.choseCity(CityList[0]);
    expect(component.cityList.length).toEqual(0);
    expect(component.weatherSettings).toEqual(CityList[0]);
  });

  it('It should give a warning when the city is not found.', () => {
    //Arrange
    component.searchTerm = "Auckland";
    dummyWeatherService.connectWeatherPlace.and.returnValue(of([]));
    component.searchPlace();
    //Assert

    expect(component.cityList.length).toEqual(0);
    expect(component.error).toEqual("Geen stad gevonden. Voer een bestaande woonplaats in");
  });

  it('City should have been succesfully been stored', () => {
    expect(component).toBeTruthy();

    //Arrange
    component.weatherSettings = CityList[0];
    dummyWeatherService.update.and.returnValue(of(CityList[0]));

    //Act
    component.onSubmit();

    //Assert
    expect(dummyWeatherService.assignToConfig).toHaveBeenCalled();
  });
});
