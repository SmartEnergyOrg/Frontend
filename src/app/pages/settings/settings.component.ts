import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { ModelMapper } from 'src/app/shared/mapping/model.mapper';
import { WidgetService } from 'src/app/shared/widget/widget.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, OnDestroy {

  private subscriptions : Subscription[] = [];
  private modelMapper: ModelMapper = new ModelMapper();

  widgets : Widget[] = []

  showText = false;
  showOffPeakRate = false;


  constructor(private widgetService: WidgetService) {}


  ngOnInit(): void {
    this.subscriptions.push(this.widgetService.getAll().subscribe(response => {
      response.result.forEach((widgetObject: any) => {
        this.widgets.push(this.modelMapper.mapToWidget(widgetObject))
      });
      console.log(this.widgets)
    }))
  }

  showWeatherInNavbar(): void {
    console.log('er is op geklikt');
    this.showText = !this.showText;
  }

  disableOffPeakRate(): void {
    this.showOffPeakRate = !this.showOffPeakRate;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
