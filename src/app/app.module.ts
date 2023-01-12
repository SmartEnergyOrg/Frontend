import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SettingsComponent } from './pages/settings/settings.component';
import { ModelMapper } from './shared/mapping/model.mapper';
import { DeleteFormComponent } from './pages/settings/delete-form/delete-form.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    PageNotFoundComponent,
    PageNotFoundComponent,
    SettingsComponent,
    DeleteFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    HttpClientModule,
    FontAwesomeModule,
    DragDropModule,
    FontAwesomeModule,
    MatIconModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "en_US" },
    ModelMapper
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
