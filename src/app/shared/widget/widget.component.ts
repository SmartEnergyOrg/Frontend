import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from './widget.service';
import { v4 as uuid } from 'uuid';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent implements OnInit {
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
    const datasets: any = []

    this.widget?.graphs?.forEach(graph => {
      datasets.push({
        type: graph.Type,
        label: graph.Name,
        data: data.map((row: any) => <any>{
          x: formatDate(row._time, 'dd-MM hh:mm:ss', 'en_US'),
          y: row._value
        })
      })
    });

    if (this.widget != undefined) {
      new Chart(this.chartId, {
        data: {
          datasets: datasets
        },
        options: {
          aspectRatio: 2,
          maintainAspectRatio: false
        }
      });
    }
  }
}
