import { Component, Input, OnInit } from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { OpenUvData } from 'src/app/models/uv-data.model';
import { WeatherModel } from 'src/app/models/weather.model';
import { OpenUvService } from './uv.service';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  ObservedWeather$: BehaviorSubject<WeatherModel | undefined> =
    new BehaviorSubject<WeatherModel | undefined>(undefined);

  uvData: OpenUvData | undefined;
  constructor(
    private weatherService: WeatherService,
    private openUvService: OpenUvService
  ) {}

  ngOnInit(): void {
    this.ObservedWeather$ = this.weatherService.getWeather();
    this.weatherService.getConfig().subscribe((config) => {
      if (config) {
        const { lat, lon } = config;
        interval(3600 * 1000); //Updates every hour
        this.openUvService
          .getData(lat, lon)
          .then((data) => (this.uvData = data));
      } else {
        console.log('Failed to get lat and lon from current weather config.');
      }
    });
  }
}
