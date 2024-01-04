import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CcipService {

  baseUrl = "https://ccip.polycode.sh/api/"

  constructor(private http: HttpClient) { }

  getWalletActivity(address: string) {
    return this.http.get<CCIPResponseWrapper>(`${this.baseUrl}/get-activity?wallet=${address}`).pipe(
      map(result => {
        return {...result, ccip_api_responses: result.ccip_api_responses.sort((a, b) => {
          const dateA = Date.parse(a.data.allCcipTransactionsFlats.nodes.at(0)!.blockTimestamp)
          const dateB = Date.parse(b.data.allCcipTransactionsFlats.nodes.at(0)!.blockTimestamp)
          return dateB - dateA
        })}
      })
    )
  }

  private refreshTriggerSub = new BehaviorSubject(null)
  refreshTrigger$ = this.refreshTriggerSub.asObservable()

  refresh() {
    this.refreshTriggerSub.next(null)
  }

}

interface CCIPResponseWrapper {
  ccip_api_responses: CCIPResponseModel[]
  tx_infos: TxInfoModel[]
}

interface TxInfoModel {
  block_number: number,
  chain_id: number,
  chainlink_chain_selectors: string[],
  controller_wallet: string,
  salt: string,
  token_address: string,
  token_amount: string,
  token_receiver: string,
  tx_hash: string,
  tx_type: string
}

interface CCIPResponseModel {
  data: {
    allCcipTransactionsFlats: {
      nodes: {
        blockTimestamp: string,
        commitStoreAddress: string,
        data: string,
        destChainId: string,
        destNetworkName: string,
        destTransactionHash: string,
        feeToken: string,
        feeTokenAmount: string,
        gasLimit: string,
        messageId: string,
        nonce: number,
        offrampAddress: string,
        onrampAddress: string,
        receiver: string,
        sender: string,
        sequenceNumber: string
        sourceChainId: string,
        transactionHash: string
      }[]
    }
  }
}