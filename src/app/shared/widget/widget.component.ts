import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { Chart, Point } from 'chart.js/auto';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from './widget.service';
import { v4 as uuid } from 'uuid';
import { formatDate } from '@angular/common';
import {
  interval,
  Observable,
  skipWhile,
  startWith,
  Subscription,
  take,
} from 'rxjs';
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

  dataReceived: boolean = false;

  // Checks if  widget is a singlestat
  // isSingleStat is true when a singlestat graph is present
  // If there is no single-stat graph, it will always return false as its default value.
  isSingleStat: boolean = false;

  constructor(
    private readonly widgetService: WidgetService,
    private elementRef: ElementRef
  ) {}

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

    if (!chartContainer) {
      throw new Error('chart-container element not found in template');
    }

    this.widget.graphs.forEach((graph, idx) => {
      //Subscribe to graph.data
      this.subscriptions.push(
        graph.data
          .pipe(
            startWith([]),
            skipWhile((value) => !value)
          ) // skip null values
          .subscribe((value) => {
            if (value.length <= 0 && !this.chart) {
              if (!this.dataReceived) {
                chartContainer.innerHTML = 'No Data Available';
              }
              return;
            }
            if (value.length > 0) {
              this.dataReceived = true;
              const [{ measurement, unit }] = value!;

              const data = value!.map(({ time, value }) => ({
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

              //Get scales to know the amount of Y axes ChartJS needs to use.
              function getScales(numDatasets: number) {
                const scales: any = {
                  x: {
                    type: 'timeseries',
                    time: {
                      displayFormats: {
                        milliseconds: 'mm:ss:fff',
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
                  },
                  y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                      display: true,
                      text: datasets[0].unit,
                    },
                    ticks: {
                      color: datasets[0].borderColor,
                    },
                  },
                };

                console.log('unit', datasets[0].unit);

                for (let i = 1; i < numDatasets; i++) {
                  scales[`y${i}`] = {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                      display: true,
                      text: datasets[i].unit,
                    },
                    ticks: {
                      color: datasets[i].borderColor,
                    },
                    grid: {
                      drawOnChartArea: false,
                    },
                  };
                }

                return scales;
              }

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
                          label: (item) => {
                            return `${item.dataset.label}: ${
                              item.formattedValue
                            } ${datasets[item.datasetIndex].unit}`;
                          },
                        },
                      },
                    },
                    aspectRatio: 2 / 2,
                    maintainAspectRatio: false,
                    responsive: true,
                    animation: {
                      duration: 0,
                    },
                    scales: getScales(datasets.length),
                  },
                });
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
