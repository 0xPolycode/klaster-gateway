import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TxQueueService {

  private ccipApiUrl = `https://ccip.chain.link/api/query?query=LATEST_TRANSACTIONS_QUERY&variables={"first":100,"offset":0,"condition":{"transactionHash":"220x003d0cc6b992a9c12727571758863015a927806097bad4240bfa8d8e0a5084e3"}}`

  private isTxQueueVisibleSub = new BehaviorSubject(false)
  isTxQueueVisible$ = this.isTxQueueVisibleSub.asObservable()

  constructor(private http: HttpClient) { }

  showTxQueue() {
    this.isTxQueueVisibleSub.next(true)
  }

  hideTxQueue() {
    this.isTxQueueVisibleSub.next(false)
  }
  
}

export interface CCIPTransactionQueryModel {
  transactionHash: string,
  destTransactionHash: string,
  sourceChainId: string,
  sender: string,
  receiver: string,
  messageId: string,
  destChainId: string,
}


