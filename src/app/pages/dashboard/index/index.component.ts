import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragMove,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  LOCALE_ID,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChartType } from 'chart.js';
import { interval, startWith, Subscription } from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from 'src/app/shared/widget/widget.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  widgetSubscription: Subscription | undefined;
  widgets: Widget[] = [];
  timeInterval = interval(6000)


  constructor(private readonly widgetService: WidgetService) {}

  ngOnInit(): void {
    this.widgetSubscription = this.widgetService.getAll().subscribe({
      next: (res) => {
        res = res.result;

        res.forEach((element: any) => {
          let widget: Widget = {
            id: element.WidgetId,
            dashboardId: element.DashboardId,
            title: element.Title,
            range: element.Range,
            frequence: element.Frequence,
            isActive: element.IsActive,
            position: element.Position,
            graphs: element.Graphs,
            lastUpdated: undefined
          };
          this.widgets.push(widget);
        });
      },
      error: (err) => {
        // TODO implement error handling
      },
    });
  }

  @ViewChild('dropListContainer') dropListContainer?: ElementRef;

  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };

  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    this.dragDropInfo = { dragIndex, dropIndex };

    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');

    if (phElement) {
      phContainer.removeChild(phElement);
      phContainer.parentElement?.insertBefore(phElement, phContainer);

      moveItemInArray(this.widgets, dragIndex, dropIndex);
    }
  }

  dragMoved(event: CdkDragMove<number>) {
    if (!this.dropListContainer || !this.dragDropInfo) return;

    const placeholderElement =
      this.dropListContainer.nativeElement.querySelector(
        '.cdk-drag-placeholder'
      );

    const receiverElement =
      this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
        ? placeholderElement?.nextElementSibling
        : placeholderElement?.previousElementSibling;

    if (!receiverElement) {
      return;
    }

    receiverElement.style.display = 'none';
    this.dropListReceiverElement = receiverElement;
  }

  dragDropped(event: CdkDragDrop<number>) {
    if (!this.dropListReceiverElement) {
      return;
    }

    this.dropListReceiverElement.style.removeProperty('display');
    this.dropListReceiverElement = undefined;
    this.dragDropInfo = undefined;
  }
}
