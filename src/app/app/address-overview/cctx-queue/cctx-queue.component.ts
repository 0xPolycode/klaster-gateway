import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, of, switchMap, tap } from 'rxjs';
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

  walletActivity$ = this.address$.pipe(
    switchMap(address => {
      if(!address) { return of(null) }
      return this.ccipService.getWalletActivity(address)
    }),
    tap(item => console.log(item))
  )

  walletActivityDisplay$ = this.walletActivity$.pipe(
    map(data => {
      return {...data, ccip_api_responses: data?.ccip_api_responses.slice(0, 4)}
    })
  )

  isSeeAllVisibleSub = new BehaviorSubject(false)
  isSeeAllVisible$ = this.isSeeAllVisibleSub.asObservable()

  constructor(private blockchainService: BlockchainService,
    private ccipService: CcipService) { }

  ngOnInit(): void {
  }

  getChainInfo(chainId: string) {
    return Chains.prod.find(x => x.id === parseInt(chainId))
  }

  formatCCTxTime(time: string) {
    const baseDate = Date.parse(time)
    const date = new Date(baseDate)
    console.log(date)
    return {
      month: date.toLocaleDateString('en-us', { month: 'short' }),
      day: date.toLocaleDateString('en-us', { day: '2-digit' }),
      time: {
        hour: date.toLocaleTimeString('en-us', { hour: '2-digit'}),
        minute: date.toLocaleDateString('en-us', { minute: '2-digit' })
      }
    }
  }

  toggleSeeAllVisible() {
    this.isSeeAllVisibleSub.next(!this.isSeeAllVisibleSub.value)
  }

}
