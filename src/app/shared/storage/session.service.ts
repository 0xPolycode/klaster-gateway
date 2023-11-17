import { Injectable } from '@angular/core';
import { SessionStore } from '../session.store';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private sessionStore: SessionStore,
    private blockchainService: BlockchainService) {}

  reset() {
    this.sessionStore.reset()
  }

  tagWallet(address: string, tag: string) {
    this.sessionStore.update(session => {
      return {
        savedWallets: session.savedWallets.concat({
          address: address,
          tag: tag
        })
      }
    })
  }
}
