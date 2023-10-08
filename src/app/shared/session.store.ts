import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ContractType } from '../onboarding/onboarding-select-type/onboarding-select-type.component';
import { Wallet } from 'ethers';

export type WalletStorage = {
    contractType: ContractType,
    wallet: string
}

export interface SessionState {
   savedWallets: WalletStorage[]
}

export function createInitialState(): SessionState {
  return {
    savedWallets: []
  };
}

@StoreConfig({ name: 'session' })
@Injectable({ providedIn: 'root' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
