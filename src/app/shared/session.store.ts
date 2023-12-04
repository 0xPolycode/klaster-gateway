import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Wallet, ethers } from 'ethers';


export interface SessionState {
   savedWallets: DerivedWalletData[]
   isLoggedIn: boolean
   ccTxHistoryHashList: string[]
}

export interface DerivedWalletData {
  address: string
  tag: string | null
}

export function createInitialState(): SessionState {
  return {
    savedWallets: [],
    isLoggedIn: false,
    ccTxHistoryHashList: []
  };
}

@StoreConfig({ name: 'session', resettable: true })
@Injectable({ providedIn: 'root' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
