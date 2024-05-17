import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { EditModelComponent } from './edit-model/edit-model.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:'registration',component:RegistrationComponent},
  { path: 'editmodel/:id', component: EditModelComponent },
  {
    path:'dashboard',component:DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
