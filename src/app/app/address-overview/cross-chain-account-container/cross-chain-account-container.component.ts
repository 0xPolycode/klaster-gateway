import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject, combineLatest, forkJoin, from, map, of, share, shareReplay, startWith, switchMap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { PriceFeedService } from 'src/app/shared/services/price-feed.service';
import { SessionQuery } from 'src/app/shared/session.query';
import { SessionService } from 'src/app/shared/storage/session.service';

@Component({
  selector: 'app-cross-chain-account-container',
  templateUrl: './cross-chain-account-container.component.html',
  styleUrls: ['./cross-chain-account-container.component.css']
})
export class CrossChainAccountContainerComponent implements OnInit {

  @Input() derivedWallet!: string
  @Input() isCollapsed = true

  tooltipTextSub = new BehaviorSubject("Copy address")
  tooltipText$ = this.tooltipTextSub.asObservable()

  isCollapsedSub = new BehaviorSubject(this.isCollapsed)
  isCollapsed$ = this.isCollapsedSub.asObservable()

  tokenList = require('../../../../assets/tokens/list.json') as TokenListRoot

  tempAddress = '0xB9b8EF61b7851276B0239757A039d54a23804CBb'
  showOnlyVerified = new FormControl(true, [])

  searchQuery = new FormControl('', [])

  addressTagInputToggledSub = new BehaviorSubject(false)
  addressTagInputToggled$ = this.addressTagInputToggledSub.asObservable()

  addressTagInputForm = new FormControl('', [Validators.required])

  portfolio$ = combineLatest([
    from(this.blockchainService.getPortfolio(this.derivedWallet, 1)).pipe(shareReplay()),
    from(this.blockchainService.getPortfolio(this.derivedWallet, 137)).pipe(shareReplay()),
  ]).pipe(
    map(([eth, matic]) => {

      const portfolio = eth.tokenBalances.map(balance => {
        return {...balance, chainID: 1}
      }).concat(matic.tokenBalances.map(balance => {
        return {...balance, chainID: 137}
      }))
      return portfolio
    })
  )

  tag$ = this.sessionQuery.wallets$.pipe(
    map(wallets => {
      console.log(wallets)
      return wallets.flatMap(wallet => wallet.derivedWallets)
        .find(wallet => wallet.address === this.derivedWallet)?.tag
    })
  )

  constructor(private blockchainService: BlockchainService,
    private storageService: SessionService,
    private sessionQuery: SessionQuery,
    private pricefeedService: PriceFeedService) { }

  ngOnInit(): void {
    this.isCollapsedSub.next(this.isCollapsed)
    // setTimeout(() => {
    //   this.showOnlyVerified.setValue(true)
    // }, 30);
  }


  toggleVisibility() {
    // if(this.isCollapsedSub.value) {
    //   setTimeout(() => {
    //     this.showOnlyVerified.setValue(true)
    //   }, 50);
    // }
    this.isCollapsedSub.next(!this.isCollapsedSub.value)
  }

  copyAddress(address: string) {
    this.tooltipTextSub.next("Copied")
    navigator.clipboard.writeText(address)
    setTimeout(() => { this.tooltipTextSub.next("Copy address") }, 500)
  }

  toggleTagInput() {
    this.isCollapsedSub.next(false)
    this.addressTagInputToggledSub.next(!this.addressTagInputToggledSub.value)
  }

  setAddressTag() {
    const tag = this.addressTagInputForm.value
    if(!tag) { return }
    this.storageService.tagWallet(this.derivedWallet, tag)
  }

}

interface TokenListRoot {
  1: TokenListModel[],
  137: TokenListModel[]
}

interface TokenListModel {
  address: string,
  logoURI: string
}
