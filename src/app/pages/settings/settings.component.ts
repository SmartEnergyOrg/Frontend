import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  showText = false;
  showOffPeakRate = false;

  ngOnInit(): void {}

  showWeatherInNavbar(): void {
    console.log('er is op geklikt');
    this.showText = !this.showText;
  }

  disableOffPeakRate(): void {
    this.showOffPeakRate = !this.showOffPeakRate;
  }
}
