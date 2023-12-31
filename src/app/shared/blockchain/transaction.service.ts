import { Injectable } from '@angular/core';
import { BehaviorSubject, sample } from 'rxjs';
import { BlockchainService } from './blockchain.service';
import { ErrorService } from '../error.service';
import { BigNumber, ethers } from 'ethers';
import { formatBytes32String } from 'ethers/lib/utils';
import { SessionService } from '../storage/session.service';
import { BalanceItem } from '@covalenthq/client-sdk';
import { TokenMetadataResponse } from 'alchemy-sdk';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private sendTxPreviewModalSub = new BehaviorSubject<null | SendTxPreview>(null)
  sendTxPreviewModal$ = this.sendTxPreviewModalSub.asObservable()

  private txStateSub = new BehaviorSubject<TxState>(null)
  txState$ = this.txStateSub.asObservable()

  private refreshCrossChainAccountsTriggerSub = new BehaviorSubject(null)
  refreshCrossChainAccountsTrigger$ = this.refreshCrossChainAccountsTriggerSub.asObservable()

  private sendNativeTxPreviewModalSub = new BehaviorSubject<null | NativeTxPreview>(null)
  sendNativeTxPreviewModal$ = this.sendNativeTxPreviewModalSub.asObservable()

  constructor(private blockchainService: BlockchainService,
    private errorService: ErrorService,
    private sessionService: SessionService) { }

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
  
  openNativeTxPreviewModal(txData: NativeTxPreview) {
    this.sendNativeTxPreviewModalSub.next(txData)
  }

  async sendDeployTransaction(chainSelectors: string[], salt: number, fee: string) {

    this.setTransactionState('signing')

    try {
      const tx = await this.blockchainService.executeContractDeployments(
        chainSelectors,
        salt.toString(),
        fee
      )
      this.setTransactionState('processing')
      
      const receipt = await tx.wait(1)
      this.refreshCrossChainAccounts()
      this.setTransactionState(null)
    } catch(err) {
      this.errorService.showSimpleError(`Transaction deployment failed: ${err}`)
      this.setTransactionState(null)
    }
  }

  declineTxPreviewModal() {
    this.sendTxPreviewModalSub.next(null)
  }
  
  declineNativeTxPreviewModal() {
    this.sendNativeTxPreviewModalSub.next(null)
  }
  
  async sendTransaction(txData: SendTxPreview) {

    this.sendTxPreviewModalSub.next(null)
    this.setTransactionState('signing')

    const klasterSingleton = this.blockchainService.getKlasterSingletonSigner()

    const erc20ABI = require('../../../assets/abis/ERC20.json')
    const erc20Interface = new ethers.utils.Interface(erc20ABI)
    const decimals = txData.metadata.decimals

    if(!decimals) { 
      this.errorService.showSimpleError("Cannot fetch decimals of ERC20 token")
      this.setTransactionState(null)
      return  
    }

    const amountInWei = 
      ethers.utils.parseUnits(txData.amount, decimals)

    const encodedData = erc20Interface.encodeFunctionData("transfer", [
      txData.recipient,
      amountInWei
    ])

    if(!klasterSingleton) { 
      this.setTransactionState(null)
      return
    }

    const chainSelector = 
      this.blockchainService
        .chains.find(chain => chain.id === txData.chainID)?.selector

    if(!chainSelector) {
      this.errorService.showSimpleError("Cannot find CCIP chain selector for the requested destination chain.")
      this.setTransactionState(null)
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
      
      const tx = await klasterSingleton['execute'](
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
  
      this.setTransactionState('processing')

      const res = await tx.wait(1)

      this.setTransactionState(null)
  
      return tx
    } catch(err) {
      this.setTransactionState(null)
      this.errorService.showSimpleError(`Transaction processing failed: ${err}`)
      return err
      
    }
  }

  async sendNativeTransaction(txData: NativeTxPreview) {

    this.sendNativeTxPreviewModalSub.next(null)
    this.setTransactionState('signing')

    const amount = ethers.utils.parseUnits(txData.amount, 18)

    const klasterSingleton = this.blockchainService.getKlasterSingletonSigner()
    const chainSelector = this.blockchainService.chains
      .find(chain => chain.id === txData.chainID)?.selector

    if(!klasterSingleton) {
      this.errorService.showSimpleError(
        `Unexpected error: Can't find Klaster singleton contract for chain ${txData.chainID}`
      )
      return
    }

    if(!chainSelector) {
      this.errorService.showSimpleError(
        `Unexpected error: Can't find chain selector for chain: ${txData.chainID}.`
      )
      return
    }

    try {

      const address = await this.blockchainService.getAddress()
      
      const fee = await klasterSingleton['calculateExecuteFee'](
        address,
        [chainSelector],
        txData.addressSalt,
        txData.recipient,
        amount,
        [],
        BigNumber.from(150000),
        formatBytes32String("")
      )

      const tx = await klasterSingleton['execute'](
        [chainSelector],
        txData.addressSalt,
        txData.recipient,
        amount,
        [],
        BigNumber.from(150000),
        formatBytes32String(""),
        {
          value: BigNumber.from(fee),
          gasLimit: BigNumber.from(300000)
        }
      )

      this.setTransactionState('processing')

      const res = await tx.wait(1)

      this.setTransactionState(null)

      return tx

    } catch(error) {
      this.setTransactionState(null)
      this.errorService.showSimpleError(`Transaction processing failed: ${error}`)
      return error
    }

  }

  setTransactionState(state: TxState) {
    this.txStateSub.next(state)
  }

  refreshCrossChainAccounts() {
    this.refreshCrossChainAccountsTriggerSub.next(null)
  }
}

type TxState = null | 'signing' | 'processing' | 'minimized'

export interface SendTxPreview {
  metadata: TokenMetadataResponse,
  recipient: string,
  amount: string,
  chainID: number,
  tokenAddress: string,
  addressSalt: string
}

export interface NativeTxPreview {
  tokenName: string
  recipient: string,
  amount: string,
  chainID: number,
  addressSalt: string
}