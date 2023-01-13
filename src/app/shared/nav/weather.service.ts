import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, interval, Observable, of } from "rxjs";
import { WeatherConfig, WeatherModel } from 'src/app/models/weather.model';
import { environment } from "src/environments/environment";
@Injectable({providedIn: 'root'})
export class WeatherService{

    //holds weather configuration of the dashboard.
    weatherConfig: any
    intervalTime: number = 7200;

    //WeatherApi stuff
    private readonly apiUrl: string = 'http://api.openweathermap.org';
    private readonly apiKey: string = "9cb3b4830154d26b03ed1e31db9b9f59";

    //Backend Api
    private readonly SERVER_API_URL: string = environment.SERVER_API_URL;

    teller = 1;
    //Weather subjects
    currentWeatherConfig: BehaviorSubject<WeatherConfig | undefined>;
    currentWeather: BehaviorSubject<WeatherModel| undefined>;

    //WeatherModel
    weatherModel:WeatherModel;
    weatherConfigModel : WeatherConfig;
    constructor(private httpClient: HttpClient){
        //url to retrieve lat and lon
        this.weatherModel = {weather: [{main: "Clouds", description: "overcast clouds", icon: "04n"}], wind: {speed: 12, deg: 120}, main: {temp: 6.78}};
        this.weatherConfigModel = {name: "Rotterdam", country: "Netherlands", lat: 51.9244424, lon: 4.47775};
        this.currentWeather = new BehaviorSubject<WeatherModel | undefined>(this.weatherModel);
        this.currentWeatherConfig = new BehaviorSubject<WeatherConfig | undefined>(this.weatherConfigModel);

        //Perform actions of behaviorsubject.
    }

    //Used to get the weather configurations
    //Will return a empty array if the city is not found.
    connectWeatherPlace(city: string):Observable<WeatherConfig[]>{
        return this.httpClient.get<WeatherConfig[]>(`${this.apiUrl}/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}&lang=nl`);
    }

    //Used to connect to openweatherApi and retrieve weatherdata.
    connectOpenWeather(lat: number, lon: number): Observable<WeatherModel>{
        return this.httpClient.get<WeatherModel>(`${this.apiUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
    }

    private repeatWeather():void{
        //Will repeat the methods below based on the specified intervalTime
        
        interval(this.intervalTime)
        .subscribe(()=>{
            //use lon and lat as parameters.
            this.connectOpenWeather(this.currentWeatherConfig.value?.lat!, this.currentWeatherConfig.value?.lon!)
            .subscribe((weatherModel)=>{
                console.log(this.teller++);
                //When the getCurrentWeather has retrieved the weathermodel, it will now assign the new value to the currentWeather.
                this.currentWeather.next(weatherModel);
            })
        })
    }
    //Retrieves current weather
    getWeather():BehaviorSubject<WeatherModel| undefined>{
        this.repeatWeather();
        return this.currentWeather;
    }

    assignToConfig(WeatherConfig: WeatherConfig){
        this.currentWeatherConfig.next(WeatherConfig);
    }

    assignToWeather(weather:WeatherModel){
        this.currentWeather.next(weather);
    }

    //These three methods below will be used to configurate the weather of the app. The place of the weather will be determined by lat, lon

    create(weatherConfig: WeatherConfig){
        //If not it will give a error.
        return this.httpClient.post<any>(this.SERVER_API_URL + '/api/weathers', weatherConfig);
    }

    getConfig():Observable<any>{
        //Retrieve one weatherConfig.
        return this.httpClient.get<any>(this.SERVER_API_URL + '/api/weathers');
    }

    update(weatherConfig: WeatherConfig){
        //Send new config to database 
        //Update local behavior subject.
        return this.httpClient.put<any>(this.SERVER_API_URL + '/api/weathers', weatherConfig);
    }

}