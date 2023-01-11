import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, Subscription, switchMap, tap } from 'rxjs';
import { IGraph } from 'src/app/interfaces/graph.interface';
import { IWidget } from 'src/app/interfaces/widget.interface';
import { Graph } from 'src/app/models/graph.model';
import { Widget } from 'src/app/models/widget.model';
import { WidgetService } from 'src/app/shared/widget/widget.service';
import { DataPoint } from '../../../models/data-point.model';
import { D } from '@angular/cdk/keycodes';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  componentExists = false;
  developerEnabled = false;

  widget = new Widget(0, '', 0, '', []);

  graph!: IGraph;

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
            return this.widgetService.getById(Number(params.get('id')));
          }
        }),
        tap(console.log)
      )
      .subscribe((widget) => (this.widget = widget));
  }

  onSubmit() {
    console.log(`${FormComponent.name} onSubmit() called`);
    console.log(
      `${FormComponent.name} onSubmit() componentExists ${this.componentExists}`
    );

    if (this.componentExists) {
      this.widgetService.update(this.widget).subscribe(() => {
        this.router.navigateByUrl('/dashboard');
      });
    } else {
      // Create new entry
      this.widgetService.create(this.widget).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });

      // this.router.navigate(['../dashboard']);
    }
  }

  //Show json in browser
  enableDeveloper() {
    this.developerEnabled = !this.developerEnabled;
    if (this.developerEnabled) {
      console.log(`${FormComponent.name} developer enabled`);
    } else {
      console.log(`${FormComponent.name} developer disabled`);
    }
  }

  addQueryToForm() {
    const graph = new Graph(0, '', '', 0, '');

    this.widget.graphs?.push(graph);

    console.log('New Query has been added');
  }
}
