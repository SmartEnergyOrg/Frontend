import { Component, Input, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  chartId: string = "chart" + Math.floor((Math.random() * 6) + 1);

  @Input()
  chartType: ChartType = "bar";

  @Input()
  chartLabels: string[] = []

  @Input()
  chartDataSets: any;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    new Chart(this.chartId, {
      type: this.chartType,

      data: {
        labels: this.chartLabels,
        datasets: this.chartDataSets
      },
      options: {
        aspectRatio: 2,
        maintainAspectRatio: false
      }

    });
  }


}
