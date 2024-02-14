import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, from, switchMap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { TransactionService } from 'src/app/shared/blockchain/transaction.service';
import { MiscModalsServiceService } from 'src/app/shared/misc-modals-service.service';

@Component({
  selector: 'app-cross-chain-accounts-overview',
  templateUrl: './cross-chain-accounts-overview.component.html',
  styleUrls: ['./cross-chain-accounts-overview.component.css']
})
export class CrossChainAccountsOverviewComponent implements OnInit {

  walletTogglerVisibleSub = new BehaviorSubject(false)
  walletTogglerVisible$ = this.walletTogglerVisibleSub.asObservable()

  address$ = this.blockchainService.address$


  derivedWallets$ = combineLatest([
    this.address$,
    this.txService.refreshCrossChainAccountsTrigger$
  ]).pipe(
    switchMap(_ => from(this.blockchainService.getDeployedWallets()))
  )

  constructor(private miscModalsService: MiscModalsServiceService,
    private blockchainService: BlockchainService,
    private txService: TransactionService) { }

  ngOnInit(): void {
  }

  toggleWalletToggler() {
    this.walletTogglerVisibleSub.next(!this.walletTogglerVisibleSub.value)
  }

  deployWallet() {
    this.miscModalsService.openDeployModal()
  }

}
