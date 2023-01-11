import { Component, Input, OnInit } from '@angular/core';
import { Chart, Point } from 'chart.js/auto';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from './widget.service';
import { v4 as uuid } from 'uuid';
import { formatDate } from '@angular/common';
import { interval, Observable, skipWhile, Subscription, take } from 'rxjs';
import { Graph } from 'src/app/models/graph.model';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent implements OnInit {
  graphSubscription: Subscription | undefined;
  chartId: string = uuid();

  @Input()
  widget!: Widget;

  chart: Chart | undefined;

  // Checks if  widget is a singlestat
  // isSingleStat is true when a singlestat graph is present
  // If there is no single-stat graph, it will always return false as its default value.
  isSingleStat: boolean;

  constructor(private readonly widgetService: WidgetService) {
    this.isSingleStat = false;
  }

  private assertInputsProvided(): void {
    if (!this.widget) {
      throw new Error('The required input [widget] was not provided');
    }
  }

  ngOnInit(): void {
    this.assertInputsProvided();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const datasets: any = [];

    this.widget.graphs.forEach((graph) => {
      this.graphSubscription = graph.data
        .pipe(skipWhile((value) => !value)) // skip null values
        .subscribe((value) => {
          if (value.length > 0) {
            const [{ measurement }] = value!;

            const data = value!.map(({ time, value }) => ({
              x: time.toString(),
              y: value,
            }));

            datasets.splice(0, datasets.length, {
              type: graph.type,
              label: measurement,
              data: data,
            });

            this.chart?.update();

            // datasets.push({
            //   type: graph.type,
            //   label:  measurement,
            //   data: data,
            // })
          }
        });
    });

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
      },
    });
  }

  ngOnDestroy() {
    this.graphSubscription?.unsubscribe();
  }

  // Will check based on the graph array if this widget is a singlestat.
  // If the widget contains one singlestat, it will return true. Otherwise false.
  checkChartType(graphs: Graph[]): boolean {
    try {
      //A deep clone will be made, so that the parent object will not be affected
      const ClonedList = JSON.parse(JSON.stringify(graphs)) as Graph[];
      console.log(ClonedList);
      const FilteredTypes = this.returnSingleStats(ClonedList);
      console.log(FilteredTypes);
      //If FilteredTypes list is bigger than 0(It contains at least on singlestat graph, it will assign true. Otherwise false);
      return FilteredTypes.length > 0;
    } catch (e) {
      throw new Error('Graph is invalid');
    }
  }

  //Returns a list with only graphs with the type SingleStat.
  returnSingleStats(graphs: Graph[]): Graph[] {
    try {
      return graphs!.filter((graph) => graph.type == 'SingleStat');
    } catch (e) {
      throw new Error('Graphlist is invalid');
    }
  }
}
