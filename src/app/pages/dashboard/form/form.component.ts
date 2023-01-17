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
import { ModelMapper } from 'src/app/shared/mapping/model.mapper';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  componentExists = false;
  developerEnabled = false;

  private widgetMapper: ModelMapper = new ModelMapper();

  widget = new Widget(0, '', 0, 'fa-solid fa-bolt-lightning', []);

  graph!: IGraph;

  subscription: Subscription | undefined;

  lastError: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private widgetService: WidgetService
  ) { }

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
              `${FormComponent.name} ngOnInit id = ${params.get('id')}`
            );
            this.componentExists = true;
            return this.widgetService.getById(Number(params.get('id')));
          }
        }),
        tap(console.log)
      )
      .subscribe((response) => {
        this.widget = this.widgetMapper.mapToWidget(response.result);
      });
  }

  onSubmit() {
    console.log(`${FormComponent.name} onSubmit() called`);
    console.log(
      `${FormComponent.name} onSubmit() componentExists ${this.componentExists}`
    );

    if (this.componentExists) {
      this.widgetService.update(this.widget).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/dashboard');
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.lastError = `${err.error.message}: ${err.error.result}`;
        },
      });
    } else {
      // Create new entry
      this.widgetService.create(this.widget).subscribe({
        next: (res) => {
          this.router.navigateByUrl('/dashboard');
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.lastError = `${err.error.message}: ${err.error.result}`;
        },
      });

      // this.router.navigate(['../dashboard']);
    }
  }

  //Show json in browser
  enableDeveloper() {
    console.log(this.widget)
    this.developerEnabled = !this.developerEnabled;
    if (this.developerEnabled) {
      console.log(`${FormComponent.name} developer enabled`);
    } else {
      console.log(`${FormComponent.name} developer disabled`);
    }
  }

  deleteQueryFromForm() {
    this.widget.graphs?.pop();
  }

  addQueryToForm() {
    this.widget.graphs?.push(new Graph(null, "bar", "", 5, "#c81030"));

    console.log('New Query has been added');
  }
}
