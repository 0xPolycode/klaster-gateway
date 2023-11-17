import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject, Observable, from, map, of, share, shareReplay } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { TransactionService } from 'src/app/shared/blockchain/transaction.service';

@Component({
  selector: 'app-single-portfolio-asset-container',
  templateUrl: './single-portfolio-asset-container.component.html',
  styleUrls: ['./single-portfolio-asset-container.component.css']
})
export class SinglePortfolioAssetContainerComponent implements OnInit, AfterViewInit {

  @Input() contractAddress!: string
  @Input() wallet!: string
  @Input() chainID!: number
  @Input() rawBalance!: string | null
  @Input() search!: string | null
  @Input() onlyVerified!: boolean | null
  @Input() addressSalt!: string

  metadata$: Observable<TokenMetadataViewModel | null> = of(null)

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
    private txService: TransactionService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.metadata$ = from(this.blockchainService.getTokenMetadata(this.contractAddress, this.chainID)).pipe(
      map(metadata => {
        return {
          ...metadata, 
          displayBalance: ethers.utils.formatUnits(
            BigNumber.from(this.rawBalance),
            metadata?.decimals ?? 1
          )
        }
      }),
      shareReplay()
    )
  }

  getNetworkURI(chainID: number) {
    return this.blockchainService.chains.find(chain => chain.id === chainID)?.logoUri
  }

  toggleSendForm() {
    this.recipientAddressForm.setValue('')
    this.sendFormToggledSub.next(!this.sendFormToggledSub.value)
  }

  matchSearch(metadata: TokenMetadataViewModel) {
    if(!this.search) { return true }
    const adjustedSearch = this.search.toLowerCase()
    return metadata.name?.toLowerCase()?.includes(adjustedSearch) 
      || metadata.symbol?.toLowerCase().includes(adjustedSearch)
      || this.contractAddress.toLowerCase().includes(adjustedSearch)
  }

  checkIfVerified(metadata: TokenMetadataViewModel) {
    return this.onlyVerified ?  metadata.logo !== null : true
  }

  openSendModal(metadata: TokenMetadataViewModel, chainID: number) {

    const decimals = metadata.decimals
    const logo = metadata.logo
    const name = metadata.name
    const symbol = metadata.symbol

    const amount = this.sendAmountForm.value
    const recipient = this.recipientAddressForm.value

    if(!decimals || !name || !symbol || !amount || !recipient) {
      alert(`Metadata missing: Decimals ${decimals}, 
        Name: ${name}, 
        Symbol: ${symbol}, 
        Amount: ${amount}, 
        Recipient: ${recipient}`)
      return
    }

    this.txService.openTxPreviewModal({
      decimals: decimals,
      logo: logo ?? null,
      name: name,
      symbol: symbol,
    }, 
      this.addressSalt,
      this.contractAddress, 
      chainID, 
      recipient, 
      amount
    )
  }

}

interface TokenMetadataViewModel {
  displayBalance?: string | null | undefined,
  name?: string | null | undefined,
  symbol?: string | null | undefined,
  decimals?: number | null | undefined,
  logo?: string | null | undefined
}