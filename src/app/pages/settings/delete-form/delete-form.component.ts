import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Widget } from 'src/app/models/widget.model';
import { ModelMapper } from 'src/app/shared/mapping/model.mapper';
import { WidgetService } from 'src/app/shared/widget/widget.service';

@Component({
  selector: 'app-delete-form',
  templateUrl: './delete-form.component.html',
  styleUrls: ['./delete-form.component.css']
})
export class DeleteFormComponent implements OnInit, OnDestroy {

  private subscriptions : Subscription[] = [];
  private widgetMapper: ModelMapper = new ModelMapper();

  widget: Widget = new Widget(-1, '', 0, '', []);

  constructor(private route: ActivatedRoute,
    private router: Router,
    private widgetService: WidgetService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params =>{
      this.loadInWidget(params["id"]);
    }));
  }

  loadInWidget(id: number) : void {
    this.subscriptions.push(this.widgetService.getById(id).subscribe(response =>{
      this.widget = this.widgetMapper.mapToWidget(response.result);
    }));
  }



  ngOnDestroy(): void {
    this.subscriptions.forEach(e => e.unsubscribe());
  }

  deleteWidget() : void{
    this.widgetService.delete(this.widget);
  }

  returnToSettings() : void{
    this.router.navigateByUrl("settings")

  }

}
