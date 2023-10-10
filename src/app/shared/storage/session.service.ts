import { Injectable } from '@angular/core';
import { SessionStore, WalletStorage } from '../session.store';
import { BlockchainService } from '../blockchain/blockchain.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private sessionStore: SessionStore,
    private blockchainService: BlockchainService) {}

  addNewWallet(wallet: WalletStorage) {
      this.sessionStore.update(session => {
        const savedWallets = session.savedWallets.map(wallet => wallet.wallet)
        if(savedWallets.includes(wallet.wallet)) { return { savedWallets: session.savedWallets } }
        return { savedWallets: session.savedWallets.concat(wallet) }
      })
  }

  removeExistingWallet(walletAddress: string) {
    this.sessionStore.update(session => ({
      savedWallets: session.savedWallets.filter(wallet => wallet.wallet !== walletAddress)
    }))
  }

  addCrossChainAccount(forWallet: string, newDerivedWallet: string) {
    this.sessionStore.update(session => {
      const walletStore = session.savedWallets.filter(saved => saved.wallet === forWallet).at(0)
      if(!walletStore) { return { savedWallets: session.savedWallets} }

      const newWalletStore: WalletStorage = {
        contractType: walletStore.contractType,
        derivedWallets: walletStore.derivedWallets.concat(newDerivedWallet),
        wallet: walletStore.wallet
      }

      const newSavedWallets = session.savedWallets.map(saved => {
        if(saved.wallet !== forWallet) { return saved }
        return newWalletStore
      })
      
      return { savedWallets: newSavedWallets }
    })
  }
}
