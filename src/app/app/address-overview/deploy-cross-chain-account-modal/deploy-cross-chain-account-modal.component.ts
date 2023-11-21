import { Chain } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject, combineLatest, from, map, of, startWith, switchMap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { ErrorService } from 'src/app/shared/error.service';
import { MiscModalsServiceService } from 'src/app/shared/misc-modals-service.service';
import { ChainSelectors } from 'src/app/shared/variables';

@Component({
  selector: 'app-deploy-cross-chain-account-modal',
  templateUrl: './deploy-cross-chain-account-modal.component.html',
  styleUrls: ['./deploy-cross-chain-account-modal.component.css']
})
export class DeployCrossChainAccountModalComponent implements OnInit {


  deployableNetworks = this.blockchainService.chains.map(network => {
    return {...network, check: new FormControl(true, [])}
  })

  deploymentSalt$ = from(this.blockchainService.getNextDeploymentSalt())
  address$ = this.blockchainService.address$

  calculatedAddress$ = combineLatest([
    this.deploymentSalt$,
    this.address$
  ]).pipe(
    switchMap(([salt, address]) => {
      if(!address) { alert("No address"); return of(null) }
      if(salt === null || salt === undefined) { alert("No salt"); return of(null) }
      return this.blockchainService.calculateAddress(address, salt.toString())
    })
  )

  connectedNetwork$ = this.blockchainService.connectedNetworkChainID$.pipe(
    map(id => {
      return this.blockchainService.chains.find(chain => chain.id === id)
    })
  )

  @Input() deployShouldBeVisibleSub!: BehaviorSubject<boolean>

  deployButtonLoadingSub = new BehaviorSubject(false)
  deployButtonLoading$ = this.deployButtonLoadingSub.asObservable()

  deploymentFee$ = combineLatest([
    this.deploymentSalt$,
    this.deployableNetworks[0].check.valueChanges.pipe(startWith(true)),
    this.deployableNetworks[1].check.valueChanges.pipe(startWith(true)),
    this.deployableNetworks[2].check.valueChanges.pipe(startWith(true)),
    this.deployableNetworks[3].check.valueChanges.pipe(startWith(true)),
    this.deployableNetworks[4].check.valueChanges.pipe(startWith(true)),
  ]).pipe(
    switchMap(([salt, eth, matic, op, arb, base]) => {
      var chainSelectors = this.getSelectedChainSelectors()
      if(salt === null || salt === undefined) { alert("No salt"); return of(null) }
      return this.blockchainService.calculateDeploymentFee(
        chainSelectors,
        salt.toString()
      )
    })
  )

  deploymentFeeString$ = this.deploymentFee$.pipe(
    map(contractFee => {
      return BigNumber.from(contractFee).add(
        BigNumber.from(700000).mul(70000000000)
      )
    }),
    map(fee => ethers.utils.formatEther(fee))
  )

  notEnoughFundsToDeploy$ = combineLatest([
    this.blockchainService.gasBalance$,
    this.deploymentFee$
  ]).pipe(
    map(([balance, fee]) => {
      return balance?.lt(BigNumber.from(fee))
    })
  )

  deployContracts(fee: string) {
    this.blockchainService.getNextDeploymentSalt().then(salt => {
      const chainSelectors = this.getSelectedChainSelectors()
      if(salt === null || salt === undefined) { return }
      this.deployButtonLoadingSub.next(true)
      this.blockchainService.executeContractDeployments(
        chainSelectors,
        salt.toString(),
        fee
      ).catch(err => {
        this.deployButtonLoadingSub.next(false)
        this.errorService.showError({
          title: "Error",
          message: err.data.message,
          type: 'error'
        })
      })
    })
  }

  private getSelectedChainSelectors() {
    return this.deployableNetworks.filter(network => network.check.value)
      .map(network => network.selector)
  }

  cancelClicked() {
    this.miscModalsService.dismissDeployModal()
  }

  constructor(private blockchainService: BlockchainService, 
    private errorService: ErrorService,
    private miscModalsService: MiscModalsServiceService) { }

  ngOnInit(): void {
  }

}
