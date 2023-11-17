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
import { AddressOverviewComponent } from './app/address-overview/address-overview.component';
import { CrossChainAccountContainerComponent } from './app/address-overview/cross-chain-account-container/cross-chain-account-container.component';
import { SinglePortfolioAssetContainerComponent } from './app/address-overview/cross-chain-account-container/single-portfolio-asset-container/single-portfolio-asset-container.component';
import { DeployCrossChainAccountModalComponent } from './app/address-overview/deploy-cross-chain-account-modal/deploy-cross-chain-account-modal.component';
import { DeployedNetworksStatusContainerComponent } from './app/address-overview/cross-chain-account-container/deployed-networks-status-container/deployed-networks-status-container.component';
import { ErrorModalComponent } from './shared/error-modal/error-modal.component';
import { TransactionModalsComponent } from './shared/transaction-modals/transaction-modals.component';

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
    ShortenPipe,
    AddressOverviewComponent,
    CrossChainAccountContainerComponent,
    SinglePortfolioAssetContainerComponent,
    DeployCrossChainAccountModalComponent,
    DeployedNetworksStatusContainerComponent,
    ErrorModalComponent,
    TransactionModalsComponent
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
