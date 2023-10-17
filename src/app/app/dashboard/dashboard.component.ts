import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, map, switchMap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { WALLETS_STORED_KEY } from 'src/app/shared/constants';
import { SessionQuery } from 'src/app/shared/session.query';
import { SessionService } from 'src/app/shared/storage/session.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  contractAddressesSub = new BehaviorSubject<string[] | null>(null)
  contractAddresses$ = this.sessionQuery.wallets$

  constructor(private sessionQuery: SessionQuery, 
    private sessionService: SessionService,
    private router: Router,
    private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.contractAddressesSub.value
  }

  connectSafe() {
    this.blockchainService.connectWallet().then(wallet => {
      console.log("WALLET OBJECT", wallet)
      this.router.navigate(['address', wallet.at(0)?.accounts.at(0)?.address])
    })
  }

  deleteAccount(address: string) {
    this.sessionService.removeExistingWallet(address)
  }


}
