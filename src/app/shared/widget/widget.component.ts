import { Component, Input, OnInit } from '@angular/core';
import { Chart, Point } from 'chart.js/auto';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from './widget.service';
import { v4 as uuid } from 'uuid';
import { formatDate } from '@angular/common';
import { interval, Observable, skipWhile, Subscription, take } from 'rxjs';
import { Graph } from 'src/app/models/graph.model';
import { DataPoint } from 'src/app/models/data-point.model';
import 'chartjs-adapter-moment';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent implements OnInit {
  private subscriptions : Subscription[] = [];
  chartId: string = uuid();

  @Input()
  widget!: Widget;

  lastData!: DataPoint;

  chart: Chart | undefined;

  // Checks if  widget is a singlestat
  // isSingleStat is true when a singlestat graph is present
  // If there is no single-stat graph, it will always return false as its default value.
  isSingleStat: boolean = false

  constructor(
    private readonly widgetService: WidgetService
  ) { }

  private assertInputsProvided(): void {
    if (!this.widget) {
      throw new Error('The required input [widget] was not provided');
    }
  }

  ngOnInit(): void {
    this.assertInputsProvided();

    this.isSingleStat = this.checkSingleStat(this.widget.graphs);
  }

  ngAfterViewInit() {
    if (!this.isSingleStat) {
      this.createChart();
    }
  }

  createChart() {
    const datasets: any = [];

    this.widget.graphs.forEach((graph, idx) => {
      //Subscribe to graph.data
      this.subscriptions.push(graph.data.pipe(
        skipWhile(value => !value)) // skip null values
        .subscribe(value => {

          if (value.length > 0) {
            const [{ measurement, unit }] = value!;

            const data = value!.map(({ time, value }) => ({ x: time, y: value }))

            if (datasets.length != this.widget.graphs.length) {
              datasets.push({
                type: graph.type,
                label: measurement,
                data: data,
                borderColor: graph.color,
                backgroundColor: graph.color,
                unit: unit
              })
            } else {
              datasets[idx].data = data;
              // let newData = data.filter(newObject => !datasets[idx].data.find((oldObject: any) => oldObject.y === newObject.y));

              // newData.forEach(data => {
              //   datasets[idx].data.shift();
              //   datasets[idx].data.push(data)
              // });
            }

            this.chart?.update();
          }
        }));
    });

    console.log(datasets)
    this.chart = new Chart(this.chartId, {
      data: {
        datasets: datasets,
      },

      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: (item) =>
                `${item.dataset.label}: ${item.formattedValue} ${datasets[0].unit}`,
            },
          },
        },
        aspectRatio: 2 / 2,
        maintainAspectRatio: false,
        responsive: true,
        animation: {
          duration: 0
        },
        scales: {
          x: {
            type: 'timeseries',
          },
          // y: {
          //   title: {
          //     display: true,
          //     text: 'Your Title'
          //   }
          // }
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  //Returns a list with only graphs with the type SingleStat.
  private checkSingleStat(graphs: Graph[]): boolean {
    try {
      return graphs!.filter((graph) => graph.type == 'SingleStat').length > 0;
    } catch (e) {
      throw new Error("Graphlist is invalid");
    }
  }
}
