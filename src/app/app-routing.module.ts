import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'app', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
