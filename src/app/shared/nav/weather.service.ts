import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, Observable } from "rxjs";
import { WeatherModel } from 'src/app/models/weather.model';
@Injectable({providedIn: 'root'})
export class WeatherService{

    intervalTime: number;
    apiUrl: string;
    apiKey: string;
    currentWeather: BehaviorSubject<WeatherModel>;

    constructor(private httpClient: HttpClient){
        this.apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=Barendrecht,NL&limit=5&appid=9cb3b4830154d26b03ed1e31db9b9f59";
        this.apiKey = "";
        this.currentWeather = new BehaviorSubject<WeatherModel>({});
        this.intervalTime = 7200;
    }

    //Used to connect to openweatherApi and retrieve weatherdata.
    getCurrentWeather(): Observable<WeatherModel>{
        return this.httpClient.get(this.apiUrl);
    }

    //Used to assign new weather to behavioursubject and thus automaticly update the observable.
    updateWeather(weather: WeatherModel){
        this.currentWeather.next(weather);
    }

    repeatWeather(){
        //Will repeat the methods below based on the specified intervalTime
        interval(this.intervalTime).subscribe(()=>{
            this.getCurrentWeather().subscribe((weatherModel)=>{
                console.log('Interval weer is er weer.');
                //When the getCurrentWeather has retrieved the weathermodel, it will now assign the new value to the currentWeather.
                this.updateWeather(weatherModel);
            })
        })
    }

    getWeather():Observable<WeatherModel>{
        this.repeatWeather();
        return this.currentWeather.asObservable();
    }



}