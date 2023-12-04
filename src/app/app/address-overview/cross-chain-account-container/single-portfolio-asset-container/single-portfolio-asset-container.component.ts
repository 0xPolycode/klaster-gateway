import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BalanceItem } from '@covalenthq/client-sdk';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject, Observable, from, map, of, share, shareReplay } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { TransactionService } from 'src/app/shared/blockchain/transaction.service';

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

  @Input() metadata!: BalanceItem

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


  getNetworkURI(chainID: number) {
    return this.blockchainService.chains.find(chain => chain.id === chainID)?.logoUri
  }

  toggleSendForm() {
    this.recipientAddressForm.setValue('')
    this.sendFormToggledSub.next(!this.sendFormToggledSub.value)
  }

  matchSearch(metadata: BalanceItem) {
    if(!this.search) { return true }
    const adjustedSearch = this.search.toLowerCase()
    return metadata.contract_name?.toLowerCase()?.includes(adjustedSearch) 
      || metadata.contract_ticker_symbol?.toLowerCase().includes(adjustedSearch)
      || this.contractAddress.toLowerCase().includes(adjustedSearch)
  }

  checkIfVerified(metadata: BalanceItem) {
    return this.onlyVerified ?  metadata.logo_url !== null : true
  }

  openSendModal(metadata: BalanceItem, chainID: number) {

    const decimals = metadata.contract_decimals
    const logo = metadata.logo_url
    const name = metadata.contract_display_name
    const symbol = metadata.contract_ticker_symbol

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

    this.txService.openTxPreviewModal(metadata, 
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