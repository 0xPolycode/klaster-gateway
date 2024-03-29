import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddressIconsHolderComponent } from './shared/components/address-icons-holder/address-icons-holder.component';
import { ReactiveFormsModule } from '@angular/forms';
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
import { HttpClientModule } from '@angular/common/http';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { CctxQueueComponent } from './app/address-overview/cctx-queue/cctx-queue.component';
import { NativePortfolioAssetContainerComponent } from './app/address-overview/cross-chain-account-container/native-portfolio-asset-container/native-portfolio-asset-container.component';
import { CrossChainTransferComponent } from './tokens/cross-chain-transfer/cross-chain-transfer.component';
import { CrossChainAccountsOverviewComponent } from './accounts/cross-chain-accounts-overview/cross-chain-accounts-overview.component';
import { IssuerPortalComponent } from './tokens/issuer-portal/issuer-portal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddressIconsHolderComponent,
    ShortenPipe,
    AddressOverviewComponent,
    CrossChainAccountContainerComponent,
    SinglePortfolioAssetContainerComponent,
    DeployCrossChainAccountModalComponent,
    DeployedNetworksStatusContainerComponent,
    ErrorModalComponent,
    TransactionModalsComponent,
    SpinnerComponent,
    CctxQueueComponent,
    NativePortfolioAssetContainerComponent,
    CrossChainTransferComponent,
    CrossChainAccountsOverviewComponent,
    IssuerPortalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [SessionQuery, SessionStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
