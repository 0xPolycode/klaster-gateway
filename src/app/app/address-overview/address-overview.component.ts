import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, from, map, of, switchMap, tap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { TransactionService } from 'src/app/shared/blockchain/transaction.service';
import { SessionQuery } from 'src/app/shared/session.query';
import { DerivedWalletData, SessionStore, WalletStorage } from 'src/app/shared/session.store';
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

  sendTxPreviewModal$ = this.txService.sendTxPreviewModal$

  deployWalletModalVisibleSub = new BehaviorSubject(false)
  deployWalletModalVisible$ = this.deployWalletModalVisibleSub.asObservable()

  constructor(private blockchainService: BlockchainService,
    private txService: TransactionService) { }

  ngOnInit(): void {
    
  }

  setNetwork() {
    this.blockchainService.setNetworkToSepolia()
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
    this.deployWalletModalVisibleSub.next(true)
  }

}
