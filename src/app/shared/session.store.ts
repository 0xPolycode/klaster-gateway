import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ContractType } from '../onboarding/onboarding-select-type/onboarding-select-type.component';
import { Wallet, ethers } from 'ethers';


export interface SessionState {
   savedWallets: DerivedWalletData[]
   isLoggedIn: boolean
}

export interface DerivedWalletData {
  address: string
  tag: string | null
}

export function createInitialState(): SessionState {
  return {
    savedWallets: [],
    isLoggedIn: false
  };
}

@StoreConfig({ name: 'session', resettable: true })
@Injectable({ providedIn: 'root' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
