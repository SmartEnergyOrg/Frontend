import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { formatDate } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { Solar } from 'src/app/models/solar.model';
import { SolarService } from 'src/app/models/solar.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  solarSubscription: Subscription | undefined;
  solar: any[] = [];

  chartType: ChartType = 'line';
  chartLabels: string[] = [];
  chartDataSets: Object[] = [];

  data: Solar[] = [
    {
      _time: '2022-12-18T21:17:05.213Z',
      _value: 357,
    },
    {
      _time: '2022-12-18T21:18:05.213Z',
      _value: 236,
    },
    {
      _time: '2022-12-18T21:19:05.213Z',
      _value: 27,
    },
    {
      _time: '2022-12-18T21:20:05.213Z',
      _value: 413,
    },
    {
      _time: '2022-12-18T21:21:05.213Z',
      _value: 889,
    },
    {
      _time: '2022-12-18T21:22:05.213Z',
      _value: 296,
    },
    {
      _time: '2022-12-18T21:23:05.213Z',
      _value: 117,
    },
    {
      _time: '2022-12-18T21:24:05.213Z',
      _value: 129,
    },
  ];

  constructor(private readonly solarService: SolarService) {}

  ngOnInit(): void {
    const data: string[] = [];
    const dataSet = {
      label: 'Solar',
      data: data,
    };

    this.data.forEach((element) => {
      this.chartLabels.push(formatDate(element._time!, 'EE dd HH:M', 'en-US'));
      data.push(element._value!.toString());
    });

    this.chartDataSets.push(dataSet);

    // this.solarSubscription = this.solarService.getAll().subscribe({
    //   next: (res) => {
    //     this.solar = res.completeTimeline;
    //   }
    //   // Add error handling and complete function
    // })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);

    console.log(
      'Widget moved from index ' +
        event.previousIndex +
        ' to index: ' +
        event.currentIndex
    );

    console.log(this.data);
  }
}
