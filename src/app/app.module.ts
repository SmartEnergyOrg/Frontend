import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { DragAndDropComponent } from './shared/widgets/drag-and-drop/drag-and-drop/drag-and-drop.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    DragAndDropComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    HttpClientModule,
    FontAwesomeModule,
    DragDropModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'nl_NL' }],
  bootstrap: [AppComponent, PageNotFoundComponent],
})
export class AppModule {}
