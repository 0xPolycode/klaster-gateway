import { Query } from '@datorama/akita';
import { SessionState, SessionStore } from './session.store';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionQuery extends Query<SessionState> {
    
    wallets$ = this.select(state => state.savedWallets)
  
    constructor(store: SessionStore) {
    super(store);
  }
}
