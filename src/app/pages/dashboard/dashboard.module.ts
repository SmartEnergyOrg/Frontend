import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FormComponent } from './form/form.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { WidgetComponent } from 'src/app/shared/widget/widget.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ViewComponent, IndexComponent, FormComponent, WidgetComponent],
  imports: [CommonModule, DashboardRoutingModule, DragDropModule, FormsModule],
})
export class DashboardModule {}
