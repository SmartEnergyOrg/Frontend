import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BarChartComponent } from './shared/widgets/bar-chart/bar-chart.component';
import { DragAndDropComponent } from './shared/widgets/drag-and-drop/drag-and-drop/drag-and-drop.component';
import { DragDrop, DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    BarChartComponent,
    DragAndDropComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, DragDropModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
