import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardRoutingModule } from './pages/dashboard/dashboard-routing.module';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DeleteFormComponent } from './pages/settings/delete-form/delete-form.component';
import { WeatherSettingsComponent } from './pages/settings/weather-settings/weather-settings.component';
import { IndexComponent as DashboardIndexComponent } from './pages/dashboard/index/index.component';
import { FormComponent as DashboardFormComponent } from './pages/dashboard/form/form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardIndexComponent
  },
  {
    path: 'settings/edit/:id',
    component: DashboardFormComponent,
  },
  {
    path: 'settings/create',
    component: DashboardFormComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'settings/delete/:id',
    component: DeleteFormComponent
  },
  {
    path: 'settings/weather',
    component: WeatherSettingsComponent
  },

  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full',
      component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
