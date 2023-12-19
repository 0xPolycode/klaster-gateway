import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject, Observable, combineLatest, forkJoin, from, map, of, share, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { ErrorService } from 'src/app/shared/error.service';
import { PriceFeedService } from 'src/app/shared/services/price-feed.service';
import { SessionQuery } from 'src/app/shared/session.query';
import { SessionService } from 'src/app/shared/storage/session.service';
import { Chains, ErrorMessages } from 'src/app/shared/variables';

@Component({
  selector: 'app-cross-chain-account-container',
  templateUrl: './cross-chain-account-container.component.html',
  styleUrls: ['./cross-chain-account-container.component.css']
})
export class CrossChainAccountContainerComponent implements OnInit {

  @Input() derivedWallet!: string
  @Input() isCollapsed = true
  @Input() salt!: string

  portfolioFetchTriggerSub = new BehaviorSubject<number | null>(null)
  portfolioFetchTrigger$ = this.portfolioFetchTriggerSub.asObservable()

  tooltipTextSub = new BehaviorSubject("Copy address")
  tooltipText$ = this.tooltipTextSub.asObservable()

  isCollapsedSub = new BehaviorSubject(this.isCollapsed)
  isCollapsed$ = this.isCollapsedSub.asObservable()

  tokenList = require('../../../../assets/tokens/list.json') as TokenListRoot

  showOnlyVerified = new FormControl(true, [])
  searchQuery = new FormControl('', [])

  addressTagInputToggledSub = new BehaviorSubject(false)
  addressTagInputToggled$ = this.addressTagInputToggledSub.asObservable()

  addressTagInputForm = new FormControl('', [Validators.required])

  isRefreshingDataSub = new BehaviorSubject(false)
  isRefreshingData$ = this.isRefreshingDataSub.asObservable()

  portfolio$ = this.portfolioFetchTrigger$.pipe(
    switchMap(_ => {
      return combineLatest(
        this.blockchainService.chains.map(chain => 
          this.blockchainService.getPortfolio(this.derivedWallet, chain.id, true))
      )
    }),
    map(chainPortfolios => {
      return chainPortfolios.flatMap(portfolio => portfolio?.tokenBalances)
    }),
    tap(_ => this.isRefreshingDataSub.next(false))
  )

  nativeTokenBalance$ = this.portfolioFetchTrigger$.pipe(
    switchMap(_ => {
      return combineLatest(Chains.prod.map(chain => {
        return from(this.blockchainService.getNativeTokenBalance(this.derivedWallet, chain.id)).pipe(
          map(chainResult => {
            if(!chainResult) { return null }
            return { 
              logoUri: chain.logoUri,
              chainId: chain.id,
              balance: chainResult,
              displayBalance: ethers.utils.formatEther(chainResult),
              token: chain.token
            }
          })
        )
      }))
    }),
    map(result => {
      return result.filter(item => {
        if(!item) { return false }
        return item.balance.gt(0)
      })
    })
  )

  tag$ = this.sessionQuery.wallets$.pipe(
    map(wallets => wallets.find(wallet => wallet.address === this.derivedWallet))
  )

  supportedNetworks = [
    { name: 'Ethereum', logo: 'ethereum.svg' },
    { name: 'Polygon', logo: 'matic.svg' },
    { name: 'Optimism', logo: 'optimism.svg' },
    { name: 'Arbitrum', logo: 'arbitrum.svg' },
    { name: 'Base', logo: 'base.svg' },
    { name: 'Ethereum', logo: 'ethereum.svg' }
  ]

  constructor(private blockchainService: BlockchainService,
    private storageService: SessionService,
    private errorService: ErrorService,
    private sessionQuery: SessionQuery) { }

  ngOnInit(): void {
    this.isCollapsedSub.next(this.isCollapsed)
    this.portfolioFetchTriggerSub.next(0)
  }

  toggleVisibility() {
    this.isCollapsedSub.next(!this.isCollapsedSub.value)
  }

  copyAddress(address: string) {
    this.tooltipTextSub.next("Copied")
    navigator.clipboard.writeText(address).catch(error => {
      this.errorService.showError({
        buttonText: 'OK',
        message: `Address:  ${address}`,
        title: 'Copy blocked by Safe security policy',
        type: 'warning'
      })
    })
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
    this.addressTagInputToggledSub.next(false)
  }

  refreshData() {
    this.isRefreshingDataSub.next(true)
    this.portfolioFetchTriggerSub.next(0)
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
