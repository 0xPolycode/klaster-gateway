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
        isLoggedIn: session.isLoggedIn
      }
    })
  }

  setLogin(isLoggedIn: boolean) {
    this.sessionStore.update(session => {
      return {
        savedWallets: session.savedWallets,
        isLoggedIn: isLoggedIn
      }
    })
  }
}
