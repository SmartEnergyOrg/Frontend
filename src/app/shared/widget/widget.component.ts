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
  private subscriptions: Subscription[] = [];
  chartId: string = uuid();

  @Input()
  widget!: Widget;

  lastData!: DataPoint;

  chart: Chart | undefined;

  // Checks if  widget is a singlestat
  // isSingleStat is true when a singlestat graph is present
  // If there is no single-stat graph, it will always return false as its default value.
  isSingleStat: boolean = false;

  constructor(private readonly widgetService: WidgetService) {}

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
    const chartContainer = document.getElementById('chart-container');

    this.widget.graphs.forEach((graph, idx) => {
      //Subscribe to graph.data
      this.subscriptions.push(
        graph.data
          .pipe(skipWhile((value) => !value)) // skip null values
          .subscribe((value) => {
            if (value.length > 0) {
              const [{ measurement, unit }] = value!;

              const data = value!.map(({ time, value }) => ({
                /*x: new Intl.DateTimeFormat('en-Uk', {
                  dateStyle: 'medium',
                  timeStyle: 'medium',
                }).format(time)*/
                
                x: time,
                y: value,
              }));

              if (datasets.length != this.widget.graphs.length) {
                datasets.push({
                  type: graph.type,
                  label: measurement,
                  data: data,
                  borderColor: graph.color,
                  backgroundColor: graph.color,
                  unit: unit,
                });
              } else {
                datasets[idx].data = data;
              }

              datasets.forEach(function callback(dataset: any, index: number) {
                dataset.yAxisID = index == 0 ? 'y' : 'y' + index;
              });

              if (datasets.length === this.widget.graphs.length) {
                if (this.chart) this.chart.destroy();
                this.chart = new Chart(this.chartId, {
                  data: {
                    datasets: datasets,
                  },

                  options: {
                  locale: 'nl-NL',
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
                      duration: 0,
                    },
                    scales: {
                      x: {
                        type: 'timeseries',
                         time: {
                         displayFormats: {
                           millisecond: 'mm:ss:fff',
                           second: 'HH:mm:ss',
                           minute: 'HH:mm',
                           hour: 'HH:mm  DD MMM',
                           day: 'DD MMM YYYY',
                           week: 'DD MMM YYYY',
                           month: 'MMM YYYY',
                           quarter: 'MMM YYYY',
                           year: 'YYYY',
              },
                      },
                      y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        ticks: {
                          color: datasets[0].borderColor,
                        },
                      },
                      y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        ticks: {
                          color: datasets[1].borderColor,
                        },
                        grid: {
                          drawOnChartArea: false,
                        },
                      },
                    },
                  },
                });
              } else {
                chartContainer!.innerHTML = 'No Data Available';
              }
            }
          })
      );

    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  //Returns a list with only graphs with the type SingleStat.
  private checkSingleStat(graphs: Graph[]): boolean {
    try {
      return graphs!.filter((graph) => graph.type == 'SingleStat').length > 0;
    } catch (e) {
      throw new Error('Graphlist is invalid');
    }
  }
}
