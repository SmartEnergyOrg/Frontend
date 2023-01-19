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
}
