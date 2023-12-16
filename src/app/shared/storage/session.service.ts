import { Injectable } from '@angular/core';
import { SessionStore } from '../session.store';
import { BlockchainService } from '../blockchain/blockchain.service';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private sessionStore: SessionStore) {}

  reset() {
    this.sessionStore.reset()
  }

  tagWallet(address: string, tag: string) {
    this.sessionStore.update(session => {
      return {
        savedWallets: session.savedWallets.concat({
          address: address,
          tag: tag
        }),
        isLoggedIn: session.isLoggedIn,
        pendingDeployments: session.pendingDeployments
      }
    })
  }

  setLogin(isLoggedIn: boolean) {
    this.sessionStore.update(session => {
      return {
        savedWallets: session.savedWallets,
        isLoggedIn: isLoggedIn,
        pendingDeployments: session.pendingDeployments
      }
    })
  }

  addCcTxToHistory(hash: string) {
    this.sessionStore.update(session => {
      return {
        savedWallets: session.savedWallets,
        isLoggedIn: session.isLoggedIn,
        ccTxHistoryHashList: session.ccTxHistoryHashList.concat(hash),
        pendingDeployments: session.pendingDeployments
      }
    })
  }

  addPendingDeployment(chainID: number, address: string) {
    this.sessionStore.update(session => {
      return {
        savedWallets: session.savedWallets,
        isLoggedIn: session.isLoggedIn,
        ccTxHistoryHashList: session.ccTxHistoryHashList,
        pendingDeployments: session.pendingDeployments.concat({
          address: address,
          chainID: chainID
        })
      }
    })
  }

  removePendingDeployment(address: string, chainID: number) {
    this.sessionStore.update(session => {
      return {
        savedWallets: session.savedWallets,
        isLoggedIn: session.isLoggedIn,
        ccTxHistoryHashList: session.ccTxHistoryHashList,
        pendingDeployments: session.pendingDeployments.filter(deployment => {
          if(deployment.chainID === chainID && deployment.address === address) {
            return false
          }
          return true
        })
      }
    })
  }
  

}
