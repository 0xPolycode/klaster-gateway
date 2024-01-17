import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, from, map, of, switchMap, tap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { CcipService } from 'src/app/shared/ccip/ccip.service';
import { Chains } from 'src/app/shared/variables';

@Component({
  selector: 'app-cctx-queue',
  templateUrl: './cctx-queue.component.html',
  styleUrls: ['./cctx-queue.component.css']
})
export class CctxQueueComponent implements OnInit {

  address$ = this.blockchainService.address$

  walletActivity$ = combineLatest([
    this.ccipService.refreshTrigger$,
    this.address$
  ]).pipe(
    switchMap(([_, address]) => {
      if(!address) { return of(null) }
      return this.ccipService.getWalletActivity(address)
    }),
    map(walletActivity => {
      return walletActivity?.tx_infos
    }),
    tap(_ => this.isRefreshingSub.next(false))
  )

  walletActivityDisplay$ = this.walletActivity$.pipe(
    map(data => {
      return data?.slice(0,4)
    })
  )

  isRefreshingSub = new BehaviorSubject(false)
  isRefreshing$ = this.isRefreshingSub.asObservable()

  connectedNetworkChainId$ = this.blockchainService.connectedNetworkChainID$

  isSeeAllVisibleSub = new BehaviorSubject(false)
  isSeeAllVisible$ = this.isSeeAllVisibleSub.asObservable()

  constructor(private blockchainService: BlockchainService,
    private ccipService: CcipService) { }

  ngOnInit(): void {
  }

  getChainInfo(chainId: string) {
    return Chains.prod.find(x => x.id === parseInt(chainId))
  }

  getChainInfoBySelector(selector: string) {
    return Chains.prod.find(x => x.selector === selector)
  }

  getTokenMetadata(address: string, chainID: number) {
    return from(this.blockchainService.getTokenMetadata(
      address, chainID
    ))
  }

  refresh() {
    this.isRefreshingSub.next(true)
    this.ccipService.refresh()
  }

  formatCCTxTime(time: string) {
    const baseDate = Date.parse(time)
    const date = new Date(baseDate)
    return {
      month: date.toLocaleDateString('en-us', { month: 'short' }),
      day: date.toLocaleDateString('en-us', { day: '2-digit' }),
      time: {
        hour: date.toLocaleTimeString('en-us', { hour: '2-digit'}),
        minute: date.toLocaleTimeString('en-us', { minute: '2-digit' }),
        hourWMinute: date.toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' })
      }
    }
  }

  toggleSeeAllVisible() {
    this.isSeeAllVisibleSub.next(!this.isSeeAllVisibleSub.value)
  }

}
