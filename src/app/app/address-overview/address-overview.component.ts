import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, from, map, of, switchMap, tap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { SendTxPreview, TransactionService } from 'src/app/shared/blockchain/transaction.service';
import { ErrorService } from 'src/app/shared/error.service';
import { MiscModalsServiceService } from 'src/app/shared/misc-modals-service.service';
import { SessionQuery } from 'src/app/shared/session.query';
import { DerivedWalletData, SessionStore } from 'src/app/shared/session.store';
import { SessionService } from 'src/app/shared/storage/session.service';

@Component({
  selector: 'app-address-overview',
  templateUrl: './address-overview.component.html',
  styleUrls: ['./address-overview.component.css']
})
export class AddressOverviewComponent implements OnInit {

  address$ = this.blockchainService.address$
  network$ = this.address$.pipe(
    switchMap(_ => this.blockchainService.connectedProvider$),
    map(provider => provider?.network.chainId),
    map(chainID => this.blockchainService.chains.find(network => network.id === chainID))
  )

  deployShouldBeVisible$ = this.miscModalsService.deployCrossChainModalVisible$

  sidebarCollapsedSub = new BehaviorSubject(false)
  sidebarCollapsed$ = this.sidebarCollapsedSub.asObservable()

  derivedWallets$ = this.address$.pipe(
    switchMap(_ => from(this.blockchainService.getDeployedWallets()))
  )
  
  // from(this.blockchainService.getDeployedWallets()).pipe(
  //   tap(wallets => console.log("WALLETS", wallets))
  // )

  walletTogglerVisibleSub = new BehaviorSubject(false)
  walletTogglerVisible$ = this.walletTogglerVisibleSub.asObservable()

  sendTxPreviewModal$ = this.txService.sendTxPreviewModal$.pipe(
    map(txData => {
      if(!txData) { return null }
      const network = this.blockchainService.chains.find(chain => chain.id === txData?.chainID)
      if(!network) { this.errorService.showSimpleError("Network variable not provided. Cannot execute transaction."); return null }
      return {...txData, network: network }
    })
  )

  constructor(private blockchainService: BlockchainService,
    private txService: TransactionService,
    private miscModalsService: MiscModalsServiceService,
    private errorService: ErrorService) { }

  ngOnInit(): void {
    
  }

  setNetwork() {
    this.blockchainService.setNetworkToSepolia()
  }

  sendTransaction(txData: SendTxPreview) {
    this.txService.sendTransaction(txData).then()
  }


  async addNewWallet(derivedWallets: DerivedWalletData[]) {
    // const newWallet = await this.blockchainService.calculateAddress(
    //   this.address,
    //   derivedWallets.length.toString()
    // )
    // this.sessionService.addCrossChainAccount(this.address, newWallet)
  }

  toggleWalletToggler() {
    this.walletTogglerVisibleSub.next(!this.walletTogglerVisibleSub.value)
  }
  
  toggleSidebar() {
    this.sidebarCollapsedSub.next(!this.sidebarCollapsedSub.value)
  }

  connectWallet() {
    this.blockchainService.connectWallet()
  }

  declineTxPreview() {
    this.txService.declineTxPreviewModal()
  }

  deployWallet() {
    this.miscModalsService.openDeployModal()
  }

}
