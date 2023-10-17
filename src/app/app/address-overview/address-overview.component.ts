import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { SessionQuery } from 'src/app/shared/session.query';
import { SessionStore, WalletStorage } from 'src/app/shared/session.store';
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

  derivedWallets$ = this.wallet$.pipe(
    map(wallet => wallet?.derivedWallets)
  )

  walletTogglerVisibleSub = new BehaviorSubject(false)
  walletTogglerVisible$ = this.walletTogglerVisibleSub.asObservable()

  constructor(private route: ActivatedRoute,
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private blockchainService: BlockchainService) { }

  ngOnInit(): void {
  }

  async addNewWallet(derivedWallets: string[]) {
    const newWallet = await this.blockchainService.calculateAddress(
      this.address,
      derivedWallets.length.toString()
    )
    this.sessionService.addCrossChainAccount(this.address, newWallet)
  }

  toggleWalletToggler() {
    this.walletTogglerVisibleSub.next(!this.walletTogglerVisibleSub.value)
  }

  connectWallet() {
    this.blockchainService.connectWallet()
  }

}
