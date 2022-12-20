import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  showText = false;

  ngOnInit(): void {}

  showWeatherInNavbar(): void {
    console.log('er is op geklikt');
    this.showText = !this.showText;
  }
}
