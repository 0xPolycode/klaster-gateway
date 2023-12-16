import { Query } from '@datorama/akita';
import { SessionState, SessionStore } from './session.store';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionQuery extends Query<SessionState> {
    
    wallets$ = this.select(state => state.savedWallets)
    isLoggedIn$ = this.select(state => state.isLoggedIn)
    ccTxHistory$ = this.select(state => state.ccTxHistoryHashList)
    pendingDeployments$ = this.select(state => state.pendingDeployments)
  
    constructor(store: SessionStore) {
    super(store);
  }
}
