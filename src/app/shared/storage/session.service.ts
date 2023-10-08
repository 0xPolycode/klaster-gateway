import { Injectable } from '@angular/core';
import { SessionStore, WalletStorage } from '../session.store';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  constructor(private sessionStore: SessionStore) {}

  addNewWallet(wallet: WalletStorage) {
      this.sessionStore.update(session => ({
          savedWallets: session.savedWallets.concat(wallet)
      }))
  }
}
