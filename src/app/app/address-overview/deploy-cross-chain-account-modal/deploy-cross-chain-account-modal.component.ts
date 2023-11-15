import { Chain } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ethers } from 'ethers';
import { BehaviorSubject, combineLatest, from, map, of, startWith, switchMap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { ErrorService } from 'src/app/shared/error.service';
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

  constructor(private blockchainService: BlockchainService, private errorService: ErrorService) { }

  ngOnInit(): void {
  }

}
