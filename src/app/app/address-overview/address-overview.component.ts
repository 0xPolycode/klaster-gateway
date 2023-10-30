import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, from, map } from 'rxjs';
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

  address = this.route.snapshot.params['address']

  wallet$ = this.sessionQuery.wallets$.pipe(
    map(wallets => {
      const fetchedWallets = wallets
        .filter(wallet => 
          wallet.wallet === this.address)
        .at(0)

      if(fetchedWallets) {
        return fetchedWallets
      } else {
        const walletStorage: WalletStorage = {
          contractType: 'SAFE',
          derivedWallets: [],
          wallet: this.address
        }
        this.sessionService.addNewWallet(walletStorage)
        this.addNewWallet(walletStorage.derivedWallets)
        return walletStorage
      }
    })
  )

  sidebarCollapsedSub = new BehaviorSubject(false)
  sidebarCollapsed$ = this.sidebarCollapsedSub.asObservable()

  derivedWallets$ = this.wallet$.pipe(
    map(wallet => wallet?.derivedWallets)
  )

  walletTogglerVisibleSub = new BehaviorSubject(false)
  walletTogglerVisible$ = this.walletTogglerVisibleSub.asObservable()

  sendTxPreviewModal$ = this.txService.sendTxPreviewModal$


  constructor(private route: ActivatedRoute,
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private blockchainService: BlockchainService,
    private txService: TransactionService) { }

  ngOnInit(): void {
    
  }


  async addNewWallet(derivedWallets: DerivedWalletData[]) {
    const newWallet = await this.blockchainService.calculateAddress(
      this.address,
      derivedWallets.length.toString()
    )
    this.sessionService.addCrossChainAccount(this.address, newWallet)
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

}
