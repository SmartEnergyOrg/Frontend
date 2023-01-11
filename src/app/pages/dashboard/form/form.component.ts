import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { Graph } from 'src/app/models/graph.model';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from 'src/app/shared/widget/widget.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  componentExists = false;
  developerEnabled = false;

  // widget: Widget = {
  //   id: undefined,
  //   title: undefined,
  //   range: undefined,
  //   dashboardId: undefined,
  //   frequence: undefined,
  //   isActive: undefined,
  //   position: undefined,
  //   lastUpdated: undefined,
  //   graphs: [{
  //     "Name": undefined,
  //     "Type": undefined,
  //     "Measurement": undefined,
  //     "Color": undefined
  //   }],
  // };

  subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private widgetService: WidgetService
  ) {}

  ngOnInit(): void {
    // this.subscription = this.route.paramMap
    // .pipe(
    //   tap((params: ParamMap) => console.log('user.id = ', params.get('id'))),
    // switchMap((params: ParamMap) => {
    //   if (!params.get('id')) {
    //     console.log(`${FormComponent.name} ngOnInit id not given`);
    //     this.componentExists = false;
    //     return of(this.widget);
    //   } else {
    //     console.log(
    //       `${FormComponent.name} ngOnInit id = ${!params.get('id')}`
    //     );
    //     this.componentExists = true;
    //     // return this.widgetService.getWidgetById(Number(params.get('id')));
    //     return 0;
    //   }
    // }),
    //   tap(console.log)
    // )
    // .subscribe((widget) => (this.widget = widget));
  }

  // deze functie wordt aangeroepen als het form wordt verzonden met de ngsubmit
  onSubmit() {
    console.log(`${FormComponent.name} onSubmit() called`);
    console.log(
      `${FormComponent.name} onSubmit() componentExists ${this.componentExists}`
    );

    // if (this.componentExists) {
    //   this.widgetService.updateWidget(this.widget).subscribe(() => {
    //     this.router.navigateByUrl('/dashboard');
    //   });
    // } else {
    //   // Create new entry
    //   console.log(this.widget.range)
    //   console.log(this.widget.frequence)
    //   let newWidget = {
    //     Widget: {
    //       Title: this.widget.title,
    //       DashboardId: 0,
    //       Range: Number(this.widget.range),
    //       Frequence: Number(this.widget.frequence),
    //       IsActive: 1,
    //       Position: 0,
    //     },
    //     Graphs: this.widget.graphs
    //   }
    //   this.widgetService.addWidget(newWidget).subscribe({
    //     next: (res) => {
    //       console.log(res)
    //     },
    //     error: (err) => {
    //       console.log(err)
    //     }
    //   })

    // this.router.navigate(['../dashboard']);
    // }
  }

  //show json in browser
  // enableDeveloper() {
  //   this.developerEnabled = !this.developerEnabled;
  //   if (this.developerEnabled) {
  //     console.log(`${FormComponent.name} developer enabled`);
  //   } else {
  //     console.log(`${FormComponent.name} developer disabled`);
  //   }
  // }

  // addGraphToForm() {
  //   let graph: Graph = {
  //     Name: undefined,
  //     Type: undefined,
  //     Measurement: undefined,
  //     Color: undefined
  //   }
  //   this.widget.graphs?.push(graph)
  //   console.log(this.widget)
  // }
}
