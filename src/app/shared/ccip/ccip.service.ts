import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

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

}

interface CCIPResponseWrapper {
  ccip_api_responses: CCIPResponseModel[]
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