import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, from, map, of, switchMap, tap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { ErrorService } from 'src/app/shared/error.service';
import { ChainSelectors } from 'src/app/shared/variables';

@Component({
  selector: 'app-deployed-networks-status-container',
  templateUrl: './deployed-networks-status-container.component.html',
  styleUrls: ['./deployed-networks-status-container.component.css']
})
export class DeployedNetworksStatusContainerComponent implements OnInit {

  @Input() derivedWallet!: string

  ethDeploymentStatus$ = this.blockchainService.address$.pipe(
    switchMap(address => {
      if(!address) { return of(null) }
      return from(this.blockchainService.checkDeploymentStatusForNetwork(1, address))
    })
  )
  
  networkLoadingSub = new BehaviorSubject(-1)
  networkLoading$ = this.networkLoadingSub.asObservable()

  deployableNetworks: any[] = []

  constructor(private blockchainService: BlockchainService,
    private errorService: ErrorService) { }

  ngOnInit(): void {
    this.deployableNetworks = this.blockchainService.chains.map(network => {
      return {...network,
        deploymentStatus$: 
          from(this.blockchainService.checkDeploymentStatusForNetwork(network.id, this.derivedWallet)) }
    })
  }

  async deployClicked(chainID: number) {
    this.networkLoadingSub.next(chainID)
    const chain = this.blockchainService.chains.find(chain => chain.id === chainID)
    if(!chain) {
      this.errorService.showSimpleError('Trying to call deploy to an unsupported chain')
      return
    }
    const deployFee = await this.blockchainService.calculateDeploymentFee([chain.selector], "0")
    this.blockchainService.executeContractDeployments([chain.selector], "0", deployFee).catch(err => {
      this.errorService.showSimpleError(err)
      this.networkLoadingSub.next(-1)
    })
    
  }

}
