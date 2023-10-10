import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { AppComponent } from './app.component';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { AddressOverviewComponent } from './app/address-overview/address-overview.component';

const routes: Routes = [
  { path: 'onboarding', component: OnboardingComponent },
  { path: '', component: DashboardComponent },
  { path: 'address/:address', component: AddressOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
