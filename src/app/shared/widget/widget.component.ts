import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from './widget.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent implements OnInit {
  // TODO implement better random id
  chartId: string = uuid();

  @Input()
  widget: Widget | undefined;

  constructor(private readonly widgetService: WidgetService) {}

  ngOnInit(): void {
    if (this.widget != undefined) {
      this.widgetService.getDataOfWidget(this.widget).subscribe({
        next: (res) => {
          this.createChart(res);
        },
        error: (err) => {
          // TODO implement error handling
        },
      });
    } else {
      // TODO implement error handling
    }
  }

  createChart(data: []) {
    if (this.widget != undefined) {
      new Chart(this.chartId, {
        type: this.widget.type,

        data: {
          datasets: [
            {
              label: 'Solar',
              data: data.map(
                (row: any) =>
                  <any>{
                    x: row._time,
                    y: row._value,
                  }
              ),
            },
          ],
        },
        options: {
          aspectRatio: 2,
          maintainAspectRatio: false,
        },
      });
    }
  }
}
