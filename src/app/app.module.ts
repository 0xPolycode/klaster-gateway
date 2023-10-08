import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { OnboardingSelectTypeComponent } from './onboarding/onboarding-select-type/onboarding-select-type.component';
import { OnboardingPasteAddressComponent } from './onboarding/onboarding-paste-address/onboarding-paste-address.component';
import { OnboardingGetAddressComponent } from './onboarding/onboarding-get-address/onboarding-get-address.component';
import { AddressIconsHolderComponent } from './shared/components/address-icons-holder/address-icons-holder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './app/dashboard/dashboard.component';
import { InfoComponent } from './onboarding/info/info.component';
import { ShortenPipe } from './shared/pipes/shorten.pipe';
import { SessionQuery } from './shared/session.query';
import { SessionStore } from './shared/session.store';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    OnboardingComponent,
    OnboardingSelectTypeComponent,
    OnboardingPasteAddressComponent,
    OnboardingGetAddressComponent,
    AddressIconsHolderComponent,
    DashboardComponent,
    InfoComponent,
    ShortenPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [SessionQuery, SessionStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
