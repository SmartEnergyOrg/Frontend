import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from 'src/app/shared/widget/widget.service';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  widgetSubscription: Subscription | undefined;
  widgets: Widget[] = [];

  constructor(private readonly widgetService: WidgetService) {}

  ngOnInit(): void {
    this.widgetSubscription = this.widgetService.getAll().subscribe({
      next: (res) => {
        res = res.result;

        let widget: Widget = {
          id: '',
          title: '',
          defaultRange: '',
          color: '',
          typeofgraphic: 'bar',
        };

        res.forEach((element: any) => {
          (widget.id = element.WidgetId),
            (widget.title = element.Title),
            (widget.defaultRange = element.DefaultRange),
            (widget.color = element.Color_Graph);
          this.widgets.push(widget);
        });
      },
      error: (err) => {
        // TODO implement error handling
      },
    });
  }
}
