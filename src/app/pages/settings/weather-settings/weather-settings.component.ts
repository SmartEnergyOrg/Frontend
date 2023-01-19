import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherConfig } from 'src/app/models/weather.model';
import { WeatherService } from 'src/app/shared/nav/weather.service';
import { Subscription} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-weather-settings',
  templateUrl: './weather-settings.component.html',
  styleUrls: ['./weather-settings.component.css']
})
export class WeatherSettingsComponent implements OnInit, OnDestroy {

  WeatherConfigSubscription: Subscription | undefined;

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
       this.WeatherConfigSubscription?.unsubscribe();
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
        this.error = "No city found. Fill in an existing city";
        this.cityList = [];
      }
    })
  }

  onSubmit(){
    console.log("Push naar db");
    this.weatherService.update(this.weatherSettings).subscribe((v)=>{
       console.log(this.weatherSettings);
       if(v){
         this.weatherService.assignToConfig(this.weatherSettings);
         this.router.navigate(['..']);
       } else{
         this.error = "Saving failed. Try again later.";
       }

    })
  }
}
