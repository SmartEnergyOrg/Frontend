import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SettingsComponent } from './pages/settings/settings.component';
import { ModelMapper } from './shared/mapping/model.mapper';
import { DeleteFormComponent } from './pages/settings/delete-form/delete-form.component';
import { MatIconModule } from '@angular/material/icon';
import { WeatherSettingsComponent } from './pages/settings/weather-settings/weather-settings.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { OpenUvService } from './shared/nav/uv.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageNotFoundComponent,
    PageNotFoundComponent,
    SettingsComponent,
    DeleteFormComponent,
    WeatherSettingsComponent,
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
    FormsModule,
    MatInputModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'nl_NL' },
    ModelMapper,
    OpenUvService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
