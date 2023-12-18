import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BalanceItem } from '@covalenthq/client-sdk';
import { TokenMetadataResponse } from 'alchemy-sdk';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject, Observable, from, map, of, share, shareReplay, switchMap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { TransactionService } from 'src/app/shared/blockchain/transaction.service';
import { ErrorService } from 'src/app/shared/error.service';

@Component({
  selector: 'app-single-portfolio-asset-container',
  templateUrl: './single-portfolio-asset-container.component.html',
  styleUrls: ['./single-portfolio-asset-container.component.css']
})
export class SinglePortfolioAssetContainerComponent implements OnInit {

  @Input() contractAddress!: string
  @Input() wallet!: string
  @Input() chainID!: number
  @Input() rawBalance!: string | null
  @Input() search!: string | null
  @Input() onlyVerified!: boolean | null
  @Input() addressSalt!: string

  metadataRefreshTriggerSub = new BehaviorSubject<number | null>(null)
  metadataRefreshTrigger$ = this.metadataRefreshTriggerSub.asObservable()

  metadata$ = this.metadataRefreshTrigger$.pipe(
    switchMap(trigger => {
      if(!trigger) { return of(undefined) }
      return this.blockchainService.getTokenMetadata(this.contractAddress, this.chainID)
    }),
    map(metadata => {
      if(!metadata) { return undefined }
      return {
        ...metadata,
        displayBalance: ethers.utils.formatUnits(
          BigNumber.from(this.rawBalance), metadata.decimals ?? 0
        )
      }
    })
  )

  sendFormToggledSub = new BehaviorSubject(false)
  sendFormToggled$ = this.sendFormToggledSub.asObservable()

  recipientAddressForm = new FormControl('', [
    Validators.minLength(42),
    Validators.maxLength(42),
    Validators.required
  ])

  sendAmountForm = new FormControl('', [
    Validators.required,
  ])

  constructor(private blockchainService: BlockchainService,
    private errorService: ErrorService,
    private txService: TransactionService) { }

  ngOnInit(): void {
    this.metadataRefreshTriggerSub.next(1)
  }


  getNetworkURI(chainID: number) {
    return this.blockchainService.chains.find(chain => chain.id === chainID)?.logoUri
  }

  toggleSendForm() {
    this.recipientAddressForm.setValue('')
    this.sendFormToggledSub.next(!this.sendFormToggledSub.value)
  }

  matchSearch(metadata: any) {
    if(!this.search) { return true }
    const adjustedSearch = this.search.toLowerCase()
    return metadata.name?.toLowerCase()?.includes(adjustedSearch) 
      || metadata.symbol?.toLowerCase().includes(adjustedSearch)
      || this.contractAddress.toLowerCase().includes(adjustedSearch)
  }

  checkIfVerified(metadata: any) {
    return true
  }

  openSendModal(metadata: any, chainID: number) {

    const decimals = metadata.decimals
    const logo = metadata.logo
    const name = metadata.name
    const symbol = metadata.symbol

    const amount = this.sendAmountForm.value
    const recipient = this.recipientAddressForm.value

    if(!decimals || !name || !symbol || !amount || !recipient) {
      this.errorService.showSimpleError(
        `Metadata missing: Decimals ${decimals}, 
        Name: ${name}, 
        Symbol: ${symbol}, 
        Amount: ${amount}, 
        Recipient: ${recipient}`
      )
      return
    }

    this.txService.openTxPreviewModal(metadata, 
      this.addressSalt,
      this.contractAddress, 
      chainID, 
      recipient, 
      amount
    )
  }

  swapClicked() {
    this.errorService.showError({
      type: 'warning',
      buttonText: 'OK',
      message: 'The team is working around the clock to add new features to Klaster Safe! Cross-chain swaps, powered by Chainlink CCIP are coming soon!',
      title: 'Coming soon'
    })
  }

}

interface TokenMetadataViewModel {
  displayBalance?: string | null | undefined,
  name?: string | null | undefined,
  symbol?: string | null | undefined,
  decimals?: number | null | undefined,
  logo?: string | null | undefined
}