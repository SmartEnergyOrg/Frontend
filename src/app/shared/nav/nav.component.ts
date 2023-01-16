import { Component, OnInit } from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable } from 'rxjs';
import { WeatherModel } from 'src/app/models/weather.model';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  faGear = faGear;
  ObservedWeather$: BehaviorSubject<WeatherModel | undefined> = new BehaviorSubject<WeatherModel|undefined>(undefined);

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.ObservedWeather$ = this.weatherService.getWeather();
  }
}
