import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '../shared/session.query';
import { SessionService } from '../shared/storage/session.service';
import { BlockchainService } from '../shared/blockchain/blockchain.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isChainSupported$ = this.blockchainService.isChainSupported$

  constructor(private sessionService: SessionService,
    private blockchainService: BlockchainService) { }

  ngOnInit(): void {
  }

  reset() {
    this.sessionService.reset()
  }

}
