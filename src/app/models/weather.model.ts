export class WeatherModel{
    weather!: Weather[]
    main!: WeatherInfo
    wind!:Wind
    constructor(){
    
    }
}

export interface WeatherConfig{
    name:string
    country:string
    lat:number
    lon:number
}
export interface WeatherResult{
    weather: Weather[]
    main: WeatherInfo
}
export interface Weather{
    main: string
    description: string,
    icon: string
}

export  interface WeatherInfo{
    temp:number
}

export interface Wind{
    speed: number
}