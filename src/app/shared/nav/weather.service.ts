import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {BehaviorSubject, interval, Observable, of, switchMap} from "rxjs";
import { WeatherConfig, WeatherModel } from 'src/app/models/weather.model';
import { environment } from "src/environments/environment";
import {map} from "rxjs/operators";
@Injectable({providedIn: 'root'})
export class WeatherService{

    //Interval is on 1 hour.
    intervalTime: number = 1000 * 3600;

    //WeatherApi stuff
    private readonly apiUrl: string = 'http://api.openweathermap.org';
    private readonly apiKey: string = "9cb3b4830154d26b03ed1e31db9b9f59";

    //Backend Api
    private readonly SERVER_API_URL: string = environment.SERVER_API_URL;
    //Weather subjects
    currentWeatherConfig: BehaviorSubject<WeatherConfig | undefined>;
    currentWeather: BehaviorSubject<WeatherModel| undefined>;

    constructor(private httpClient: HttpClient){
        this.currentWeather = new BehaviorSubject<WeatherModel | undefined>(undefined);
        this.currentWeatherConfig = new BehaviorSubject<WeatherConfig | undefined>(undefined);

        //At startup it will retrieve the configuration from the database.
        this.getConfig().subscribe((config)=>{
          console.log("Config Opgehaald.");
          this.currentWeatherConfig.next(config);
          this.currentWeatherConfig.subscribe((config)=>{
            console.log("Config gewijzigd.");
            if(config){
              this.connectOpenWeather(config?.lat!, config?.lon!).subscribe((weather)=>{
                this.currentWeather.next(weather);
              })
            } else{
              console.log("Weer ophalen is mislukt.");
            }
          })
        })
    }

    //Used to get the weather configurations
    //Will return a empty array if the city is not found.
    connectWeatherPlace(city: string):Observable<WeatherConfig[] | any>{
        return this.httpClient.get<WeatherConfig[]>(`${this.apiUrl}/geo/1.0/direct?q=${city}&limit=20&appid=${this.apiKey}&lang=nl`);
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
        return this.httpClient.post<any>(this.SERVER_API_URL + '/api/weathers', weatherConfig)
          .pipe(
            map((value)=>{
              //Result is either false or an weatherConfig
              if(value.result){
                const newConfig = value.result as WeatherConfig;
                this.assignToConfig(newConfig)
                return true;
              } else{
                //It will give back an message.
                //message is only present if result is false
                console.error(value.message);
                return value.message;
              }
            })
          )
    }

    getConfig():Observable<WeatherConfig | undefined>{
        //Retrieve one weatherConfig.
        return this.httpClient.get<any>(this.SERVER_API_URL + '/api/weathers').pipe(
          map((value)=>{
            if(value.result){
              const config = value.result as WeatherConfig;
              return config;
            } else{
              return undefined;
            }
          })
        );
      //return of(this.weatherConfigModel);
    }

    update(weatherConfig: WeatherConfig){
        //Send new config to database
        //Update local behavior subject.
        return this.httpClient.put<any>(this.SERVER_API_URL + '/api/weathers', weatherConfig).pipe(
          map((value)=>{
            if(value.status != 401){
              const newConfig = value.result as WeatherConfig;
              this.assignToConfig(newConfig)
              return newConfig;
            } else{
              console.error(value.result);
              return false;
            }
          })
        );
    }

}
