import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { TransactionService } from 'src/app/shared/blockchain/transaction.service';
import { ErrorService } from 'src/app/shared/error.service';

@Component({
  selector: 'app-native-portfolio-asset-container',
  templateUrl: './native-portfolio-asset-container.component.html',
  styleUrls: ['./native-portfolio-asset-container.component.css']
})
export class NativePortfolioAssetContainerComponent implements OnInit {

  @Input() logoUri!: string | undefined
  @Input() chainId!: number
  @Input() displayBalance!: string
  @Input() balance!: BigNumber
  @Input() token!: string
  @Input() addressSalt!: string

  sendFormToggledSub = new BehaviorSubject(false)
  sendFormToggled$ = this.sendFormToggledSub.asObservable()

  recipientAddressForm = new FormControl('', [Validators.required])
  sendAmountForm = new FormControl('', [Validators.required])


  constructor(private blockchainService: BlockchainService,
    private transactionService: TransactionService,
    private errorService: ErrorService) { }

  ngOnInit(): void {
  }

  getNetoworkLogo(chainID: number) {
    return this.blockchainService.chains.find(chain => chain.id === chainID)?.logoUri
  }

  toggleSendForm() {
    this.sendFormToggledSub.next(!this.sendFormToggledSub.value)
  }

  openNativeTransactionSend() {

    this.sendFormToggledSub.next(false)


    if(!this.sendAmountForm.value) {
      this.errorService.showSimpleError(
        "Unexpected error: Malformed value input (native send). Please contact Klaster"
      )
      return
    }

    const recipient = this.recipientAddressForm.value

    if(!recipient) {
      this.errorService.showSimpleError(
        "Unexpected error: Malformed recipient input (native send). Please contact Klaster."
      )
      return
    }

    this.transactionService.openNativeTxPreviewModal({
      addressSalt: this.addressSalt,
      amount: this.sendAmountForm.value,
      chainID: this.chainId,
      recipient: recipient,
      tokenName: this.token
    })
  }

}
