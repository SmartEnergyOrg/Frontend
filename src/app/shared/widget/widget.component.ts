import { Component, Input, OnInit } from '@angular/core';
import { Chart, Point } from 'chart.js/auto';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from './widget.service';
import { v4 as uuid } from 'uuid';
import { formatDate } from '@angular/common';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent implements OnInit {
  chartId: string = uuid();

  @Input()
  widget: Widget | undefined;

  data: Point[] = [];
  chart: Chart | undefined;

  constructor(private readonly widgetService: WidgetService) {}

  ngOnInit(): void {
    if (this.widget != undefined) {
      this.widgetService.getDataOfWidget(this.widget).subscribe({
        next: (res) => {
          this.data = res.map((row: any) => <any>{
            x: formatDate(row._time, 'dd-MM hh:mm:ss', 'en_US'),
            y: row._value
          });

          this.createChart(this.data);
        },
        error: (err) => {
          // TODO implement error handling
        },
        complete: () => {
          this.widget!.lastUpdated = new Date();
        }
      });

      interval(this.widget.frequence! * 100).subscribe({
        next: () => {
          if (this.widget != undefined) {
            this.widgetService.getDataOfWidget(this.widget).subscribe({
              next: (res) => {
                // res = res.sort((aTime: any, bTime: any) => {
                //   new Date(aTime._time) < new Date(bTime._time)
                // })
                res = res.map((row: any) => <any>{
                  x: formatDate(row._time, 'dd-MM hh:mm:ss', 'en_US'),
                  y: row._value
                });

                this.data = res;
                this.chart?.destroy();

                this.widget!.lastUpdated = new Date();
                this.createChart(this.data);
                // this.chart?.update()
              }
            })
          }
        }
      })
    } else {
      // TODO implement error handling
    }
  }

  createChart(data: Point[]) {
    const datasets: any = []

    this.widget?.graphs?.forEach(graph => {
      datasets.push({
        type: graph.Type,
        label: graph.Name,
        data: data
      })
    });

    if (this.widget != undefined) {
      this.chart = new Chart(this.chartId, {
        data: {
          datasets: datasets
        },
        options: {
          aspectRatio: 2,
          maintainAspectRatio: true
        }
      });
    }
  }
}
