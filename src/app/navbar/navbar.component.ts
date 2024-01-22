import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '../shared/session.query';
import { SessionService } from '../shared/storage/session.service';
import { BlockchainService } from '../shared/blockchain/blockchain.service';
import { ErrorService } from '../shared/error.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isChainSupported$ = this.blockchainService.isChainSupported$

  constructor(private sessionService: SessionService,
    private errorService: ErrorService,
    private blockchainService: BlockchainService) { }

  ngOnInit(): void {
  }

  reset() {
    this.sessionService.reset()
  }

  comingSoon() {
    this.errorService.showError({
      title: 'Coming Soon',
      type: 'warning',
      buttonText: 'OK',
      message: 'Cross-chain token portal is launching very soon. Stay tuned.'
    })
  }

}
