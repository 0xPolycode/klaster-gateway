import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from, map, switchMap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { WALLETS_STORED_KEY } from 'src/app/shared/constants';
import { SessionQuery } from 'src/app/shared/session.query';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  contractAddressesSub = new BehaviorSubject<string[] | null>(null)
  contractAddresses$ = this.sessionQuery.wallets$

  constructor(private sessionQuery: SessionQuery, 
    private blockchainService: BlockchainService) { }

  ngOnInit(): void {

  }


}
