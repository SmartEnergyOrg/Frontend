import { Component, OnInit } from '@angular/core';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  faGear = faGear;
  ObservedWeather$: Observable<any>;

  constructor(private weatherService: WeatherService) {
    this.ObservedWeather$ = new Observable<any>();
  }

  ngOnInit(): void {
    this.ObservedWeather$ = this.weatherService.getWeather();
  }
}
