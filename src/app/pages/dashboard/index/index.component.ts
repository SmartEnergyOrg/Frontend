import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { ModelMapper } from 'src/app/shared/mapping/model.mapper';
import { WidgetService } from 'src/app/shared/widget/widget.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  widgetSubscription: Subscription | undefined;
  widgets: Widget[] = [];

  constructor(
    private readonly widgetService: WidgetService,
    private readonly modelMapper: ModelMapper
  ) {}

  ngOnInit(): void {
    this.widgetService.getAll().subscribe({
      next: (response) => {
        response.result.forEach((res: any) => {
          const widget: Widget = this.modelMapper.mapToWidget(res);
          this.widgetService.connect(widget);
          this.widgets.push(widget);
        });
      },
    });
  }

  // DRAG AND DROP FUNCTIONS

  // @ViewChild('dropListContainer') dropListContainer?: ElementRef;

  // dropListReceiverElement?: HTMLElement;
  // dragDropInfo?: {
  //   dragIndex: number;
  //   dropIndex: number;
  // };

  // dragEntered(event: CdkDragEnter<number>) {
  //   const drag = event.item;
  //   const dropList = event.container;
  //   const dragIndex = drag.data;
  //   const dropIndex = dropList.data;

  //   this.dragDropInfo = { dragIndex, dropIndex };

  //   const phContainer = dropList.element.nativeElement;
  //   const phElement = phContainer.querySelector('.cdk-drag-placeholder');

  //   if (phElement) {
  //     phContainer.removeChild(phElement);
  //     phContainer.parentElement?.insertBefore(phElement, phContainer);

  //     moveItemInArray(this.widgets, dragIndex, dropIndex);
  //   }
  // }

  // dragMoved(event: CdkDragMove<number>) {
  //   if (!this.dropListContainer || !this.dragDropInfo) return;

  //   const placeholderElement =
  //     this.dropListContainer.nativeElement.querySelector(
  //       '.cdk-drag-placeholder'
  //     );

  //   const receiverElement =
  //     this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
  //       ? placeholderElement?.nextElementSibling
  //       : placeholderElement?.previousElementSibling;

  //   if (!receiverElement) {
  //     return;
  //   }

  //   receiverElement.style.display = 'none';
  //   this.dropListReceiverElement = receiverElement;
  // }

  // dragDropped(event: CdkDragDrop<number>) {
  //   if (!this.dropListReceiverElement) {
  //     return;
  //   }

  //   this.dropListReceiverElement.style.removeProperty('display');
  //   this.dropListReceiverElement = undefined;
  //   this.dragDropInfo = undefined;
  // }
}
