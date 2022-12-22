import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: IndexComponent,
    // children: [
    //   {
    //     path: 'create',
    //     component: FormComponent,
    //   },
    //   { path: ':id/edit', pathMatch: 'full', component: FormComponent },
    //   { path: ':id', pathMatch: 'full', component: ViewComponent },
    // ],
  },
  {
    path: 'dashboard/create',
    component: FormComponent,
  },
  { path: 'dashboard/:id/edit', pathMatch: 'full', component: FormComponent },
  { path: 'dashboard/:id', pathMatch: 'full', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
