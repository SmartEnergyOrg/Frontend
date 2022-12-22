import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { WidgetService } from 'src/app/shared/widget/widget.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  componentExists = false;

  widget = {
    Id: '',
    Title: '',
    DashboardId: '',
    Type_Of_Graph: '',
    DefaultRange: '',
    Color_Graph: '',
  };

  subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private widgetService: WidgetService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap
      .pipe(
        tap((params: ParamMap) => console.log('user.id = ', params.get('id'))),
        switchMap((params: ParamMap) => {
          if (!params.get('id')) {
            console.log(`${FormComponent.name} ngOnInit id not given`);
            this.componentExists = false;
            return of(this.widget);
          } else {
            console.log(
              `${FormComponent.name} ngOnInit id = ${!params.get('id')}`
            );
            this.componentExists = true;
            return this.widgetService.getWidgetById(Number(params.get('id')));
          }
        }),
        tap(console.log)
      )
      .subscribe((widget) => (this.widget = widget));
  }
}
