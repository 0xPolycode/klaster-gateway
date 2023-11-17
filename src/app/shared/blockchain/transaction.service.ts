import { Injectable } from '@angular/core';
import { BigNumber, TokenMetadataResponse } from 'alchemy-sdk';
import { BehaviorSubject, sample } from 'rxjs';
import { BlockchainService } from './blockchain.service';
import { ErrorService } from '../error.service';
import { ethers } from 'ethers';
import { formatBytes32String } from 'ethers/lib/utils';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private sendTxPreviewModalSub = new BehaviorSubject<null | SendTxPreview>(null)
  sendTxPreviewModal$ = this.sendTxPreviewModalSub.asObservable()

  private transactionCurrentlyProcessingSub = new BehaviorSubject(false)
  transactionCurrentlyProcessing$ = this.transactionCurrentlyProcessingSub.asObservable()

  constructor(private blockchainService: BlockchainService,
    private errorService: ErrorService) { }

  openTxPreviewModal(metadata: TokenMetadataResponse, addressSalt: string, tokenAddress: string, chainID: number, recipient: string, amount: string) {
    this.sendTxPreviewModalSub.next({
      metadata: metadata,
      recipient: recipient,
      amount: amount,
      chainID: chainID,
      tokenAddress: tokenAddress,
      addressSalt: addressSalt
    })
  } 

  declineTxPreviewModal() {
    this.sendTxPreviewModalSub.next(null)
  }

  async sendTransaction(txData: SendTxPreview) {

    this.sendTxPreviewModalSub.next(null)
    this.transactionCurrentlyProcessingSub.next(true)

    const klasterSingleton = this.blockchainService.getKlasterSingletonSigner()

    const erc20ABI = require('../../../assets/abis/ERC20.json')
    const erc20Interface = new ethers.utils.Interface(erc20ABI)
    const decimals = txData.metadata.decimals

    if(!decimals) { 
      this.errorService.showSimpleError("Cannot fetch decimals of ERC20 token")
      this.transactionCurrentlyProcessingSub.next(false)
      return  
    }

    const amountInWei = 
      ethers.utils.parseUnits(txData.amount, decimals)

    const encodedData = erc20Interface.encodeFunctionData("transfer", [
      txData.recipient,
      amountInWei
    ])

    if(!klasterSingleton) { 
      this.transactionCurrentlyProcessingSub.next(false)
      return
    }

    const chainSelector = 
      this.blockchainService
        .chains.find(chain => chain.id === txData.chainID)?.selector

    if(!chainSelector) {
      this.errorService.showSimpleError("Cannot find CCIP chain selector for the requested destination chain.")
      this.transactionCurrentlyProcessingSub.next(false)
      return
    }

    const address = await this.blockchainService.getAddress()

    try {
      const fee = await klasterSingleton['calculateExecuteFee'](
        address,
        [chainSelector],
        txData.addressSalt,
        txData.tokenAddress,
        0,
        encodedData,
        BigNumber.from(2000000),
        formatBytes32String("")
      )
      
      const result =  await klasterSingleton['execute'](
        [chainSelector],
        txData.addressSalt,
        txData.tokenAddress,
        0,
        encodedData,
        BigNumber.from(2000000),
        formatBytes32String(""),
        {
          value: BigNumber.from(fee),
          gasLimit: BigNumber.from(300000)
        }
      )
  
      this.transactionCurrentlyProcessingSub.next(false)
  
      return result
    } catch(err) {
      this.transactionCurrentlyProcessingSub.next(false)
      this.errorService.showSimpleError(`Transaction processing failed: ${err}`)
      return err
      
    }
  }
}

export interface SendTxPreview {
  metadata: TokenMetadataResponse,
  recipient: string,
  amount: string,
  chainID: number,
  tokenAddress: string,
  addressSalt: string
}