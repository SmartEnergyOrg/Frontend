import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  componentExists = false;

  widget = {
    Title: '',
    DashboardId: '',
    Type_Of_Graph: '',
    DefaultRange: '',
    Color_Graph: '',
  };

  constructor() {}

  ngOnInit(): void {}
}
