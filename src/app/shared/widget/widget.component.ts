import { Component, Input, OnInit } from '@angular/core';
import { Chart, Point } from 'chart.js/auto';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from './widget.service';
import { v4 as uuid } from 'uuid';
import { formatDate } from '@angular/common';
import { interval, Observable } from 'rxjs';
import { IGraph } from 'src/app/interfaces/graph.interface';
import { IWidget } from 'src/app/interfaces/widget.interface';
import { IData } from 'src/app/interfaces/data.interface';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent implements OnInit {
  chartId: string = uuid();

  @Input()
  widget!: IWidget;
  graph!: IGraph;
  data!: IData;

  chartData: Point[] = [];
  chart: Chart | undefined;

  constructor(private readonly widgetService: WidgetService) {}

  ngOnInit(): void {
    if (this.widget != undefined) {
      this.widgetService.getDataOfWidget(this.widget).subscribe({
        next: (res) => {
          this.data = res.map(
            (row: any) =>
              <any>{
                x: formatDate(row._time, 'dd-MM hh:mm:ss', 'en_US'),
                y: row._value,
              }
          );

          this.createChart(this.chartData);
        },
        error: (err) => {
          // TODO implement error handling
        },
        complete: () => {
          this.data.time = new Date();
        },
      });

      interval(this.graph.interval! * 100).subscribe({
        next: () => {
          if (this.widget != undefined) {
            this.widgetService.getDataOfWidget(this.widget).subscribe({
              next: (res) => {
                res = res.map(
                  (row: any) =>
                    <any>{
                      x: formatDate(row._time, 'dd-MM hh:mm:ss', 'en_US'),
                      y: row._value,
                    }
                );

                this.data = res;
                this.chart?.destroy();

                this.data.time = new Date();
                this.createChart(this.chartData);
              },
            });
          }
        },
      });
    } else {
      // TODO implement error handling
    }
  }

  createChart(chartData: Point[]) {
    const datasets: any = [];

    this.widget?.graphs?.forEach((graph) => {
      datasets.push({
        type: graph.type,
        label: this.widget.title,
        data: chartData,
      });
    });

    if (this.widget != undefined) {
      this.chart = new Chart(this.chartId, {
        data: {
          datasets: datasets,
        },
        options: {
          aspectRatio: 2,
          maintainAspectRatio: true,
          animation: {
            duration: 0,
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Watt',
              },
            },
          },
        },
      });
    }
  }
}
