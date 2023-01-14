import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { WeatherConfig } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/shared/nav/weather.service';
import {fromEvent, Observable, of, OperatorFunction, Subscription} from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import {Router} from "@angular/router";

@Component({
  selector: 'app-weather-settings',
  templateUrl: './weather-settings.component.html',
  styleUrls: ['./weather-settings.component.css']
})
export class WeatherSettingsComponent implements OnInit, OnDestroy {

  WeatherConfigSubscription: Subscription = new Subscription();

  error: string = "";

  weatherSettings!: WeatherConfig;

  searchTerm: string;

  cityList: WeatherConfig[] = [];
  foundCity:boolean = false;


  constructor(private weatherService: WeatherService, private router: Router) {
    this.searchTerm = "";
    this.weatherSettings = {
      name: "",
      country: "",
      lat: 0,
      lon: 0
    }
  }

  ngOnDestroy(): void {
       this.WeatherConfigSubscription.unsubscribe();
    }

  choseCity(city: WeatherConfig){
    this.weatherSettings = city;
    this.cityList = [];
  }

  ngOnInit(): void {
    this.WeatherConfigSubscription = this.weatherService.getConfig().subscribe((v)=>{
      if (v){
        this.weatherSettings = v;
        this.foundCity = true;
      } else{
        this.foundCity = false;
      }
    })
  }

  //Used to show all cities that matches the searchTerm.
  searchPlace(){
    this.weatherService
    .connectWeatherPlace(this.searchTerm)
    .subscribe(
      (place)=>{
      console.log(place);
      if(place.length > 0){
        this.error = "";
        this.foundCity = true;
        this.cityList = place;
      }else{
        this.error = "Geen stad gevonden. Voer een bestaande woonplaats in";
        this.cityList = [];
      }
    })
  }

  onSubmit(){
    console.log("Push naar db");
    // this.weatherService.create(this.weatherSettings).subscribe((v)=>{
    //   console.log(this.weatherSettings);
    //   this.weatherService.assignToConfig(this.weatherSettings);
    // })
    console.log(this.weatherSettings);
    this.weatherService.assignToConfig(this.weatherSettings);
    this.router.navigate(['..']);
  }
}
