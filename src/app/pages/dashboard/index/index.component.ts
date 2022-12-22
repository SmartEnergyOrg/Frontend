import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from 'src/app/shared/widget/widget.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  widgetSubscription: Subscription | undefined;
  widgets: Widget[] = [];

  constructor(
    private readonly widgetService: WidgetService
  ) { }

  ngOnInit(): void {
    this.widgetSubscription = this.widgetService.getAll().subscribe({
      next: res => {
        res = res.result
        res.forEach((element: any)=> {
          this.widgets.push(
            new Widget(
              element.WidgetId,
              element.Title,
              element.DefaultRange,
              element.Color_Graph
            )
          )
        });
      },
      error: err => {
        // TODO implement error handling
      }
    })
  }
}
