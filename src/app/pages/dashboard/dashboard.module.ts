import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormComponent } from './form/form.component';
import { IndexComponent } from './index/index.component';
import { WidgetComponent } from 'src/app/shared/widget/widget.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IndexComponent, FormComponent, WidgetComponent],
  imports: [CommonModule, DragDropModule, FormsModule],
})
export class DashboardModule {}
