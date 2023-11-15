import { Injectable } from '@angular/core';
import { BigNumber, TokenMetadataResponse } from 'alchemy-sdk';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private sendTxPreviewModalSub = new BehaviorSubject<null | SendTxPreview>(null)
  sendTxPreviewModal$ = this.sendTxPreviewModalSub.asObservable()

  constructor() { }

  openTxPreviewModal(metadata: TokenMetadataResponse, network: string, recipient: string, amount: string) {
    this.sendTxPreviewModalSub.next({
      metadata: metadata,
      recipient: recipient,
      amount: amount
    })
  } 

  declineTxPreviewModal() {
    this.sendTxPreviewModalSub.next(null)
  }
}

interface SendTxPreview {
  metadata: TokenMetadataResponse,
  recipient: string,
  amount: string
}