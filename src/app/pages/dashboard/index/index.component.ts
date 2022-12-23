import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { formatDate } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from 'src/app/shared/widget/widget.service';

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
        res.forEach((element: any) => {
          this.widgets.push(
            new Widget(
              element.WidgetId,
              element.Title,
              element.DefaultRange,
              element.Color_Graph
            )
          );
        });
      },
      error: (err) => {
        // TODO implement error handling
      },
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.widgets, event.previousIndex, event.currentIndex);

    if (event.previousIndex != event.currentIndex) {
      console.log(
        'Index changed from ' +
          event.previousIndex +
          ' to index: ' +
          event.currentIndex
      );
    } else {
      console.log('Index has not been changed');
    }
  }
}
