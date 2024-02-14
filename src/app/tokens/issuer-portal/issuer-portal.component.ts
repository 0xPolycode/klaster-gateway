import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';

@Component({
  selector: 'app-issuer-portal',
  templateUrl: './issuer-portal.component.html',
  styleUrls: ['./issuer-portal.component.css']
})
export class IssuerPortalComponent implements OnInit {

  networks = this.blockchainService.chains
  
  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
  }

}
