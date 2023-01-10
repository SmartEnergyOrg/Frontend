import { Component, Input, OnInit } from '@angular/core';
import { Chart, Point } from 'chart.js/auto';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from './widget.service';
import { v4 as uuid } from 'uuid';
import { formatDate } from '@angular/common';
import { interval, Observable } from 'rxjs';
import { Graph } from 'src/app/models/graph.model';
import { DataPoint } from 'src/app/models/data-point.model';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent implements OnInit {
  chartId: string = uuid();

  @Input()
  widget!: Widget;

  chart: Chart | undefined;

  constructor(
    private readonly widgetService: WidgetService
  ) { }

  private assertInputsProvided(): void {
    if (!this.widget) {
      throw (new Error("The required input [widget] was not provided"));
    }
  }

  ngOnInit(): void {
    this.assertInputsProvided();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const datasets: any = []

    this.widget.graphs.forEach(graph => {
      const [{ measurement }] = graph.data;

      const data = graph.data.map(({time,value}) => ({x: time.toString(), y: value}))

      datasets.push({
        type: graph.type,
        label:  measurement,
        data: data,
      })
    });

    this.chart = new Chart(this.chartId, {
      data: {
        datasets: datasets
      },
      options: {
        aspectRatio: 2,
        maintainAspectRatio: true,
        animation: {
          duration: 0
        }
      }
    });
  }
}
