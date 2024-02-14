import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddressOverviewComponent } from './app/address-overview/address-overview.component';
import { CrossChainTransferComponent } from './tokens/cross-chain-transfer/cross-chain-transfer.component';
import { CrossChainAccountsOverviewComponent } from './accounts/cross-chain-accounts-overview/cross-chain-accounts-overview.component';
import { IssuerPortalComponent } from './tokens/issuer-portal/issuer-portal.component';

const routes: Routes = [
  { path: 'accounts', component: CrossChainAccountsOverviewComponent },
  { path: 'tokens', component: CrossChainTransferComponent },
  { path: 'issuer-portal', component: IssuerPortalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
