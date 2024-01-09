import { Chain } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BigNumber, ethers } from 'ethers';
import { BehaviorSubject, combineLatest, from, map, of, startWith, switchMap } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { TransactionService } from 'src/app/shared/blockchain/transaction.service';
import { ErrorService } from 'src/app/shared/error.service';
import { MiscModalsServiceService } from 'src/app/shared/misc-modals-service.service';
import { CCIPLanes, ChainSelectors } from 'src/app/shared/variables';

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
      if(!address) { this.errorService.showSimpleError("Can't fetch address"); return of(null) }
      if(salt === null || salt === undefined) { this.errorService.showSimpleError("No salt"); return of(null) }
      return this.blockchainService.calculateAddress(address, salt.toString())
    })
  )

  connectedNetwork$ = this.blockchainService.connectedNetworkChainID$.pipe(
    map(id => {
      return this.blockchainService.chains.find(chain => chain.id === id)
    })
  )

  directLanes$ = this.connectedNetwork$.pipe(
    map(connectedNetwork => {
      const id = connectedNetwork?.id
      if(!id) { return null }
      return CCIPLanes.lanes[connectedNetwork.id]
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
      if(salt === null || salt === undefined) { this.errorService.showSimpleError("Can't fetch account salt"); return of() }
      return from(
          this.blockchainService.calculateDeploymentFee(
            chainSelectors,
            salt.toString()
          )
        )
    }),
    // switchMap(([cctxFee, selectors, salt]) => {
    //   return from(this.blockchainService.estimateDeploymentTxGas(selectors,
    //     salt.toString(),
    //     cctxFee.toString()
    //   )).pipe(
    //     map(gasFee => {
    //       return BigNumber.from(cctxFee).add(BigNumber.from(gasFee))
    //     })
    //   )
    // })
  )

  deploymentFeeString$ = this.deploymentFee$.pipe(
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

  checkIfDoesntContain(numberArray: number[], number: number) {
    return !numberArray.includes(number)
  }

  deployContracts(fee: string) {
    this.miscModalsService.dismissDeployModal()
    this.blockchainService.getNextDeploymentSalt().then(salt => {
      const chainSelectors = this.getSelectedChainSelectors()
      if(salt === null || salt === undefined) { 
        this.errorService.showSimpleError(`Can't fetch next deploymetn salt. Please check connected network. If problem perists, please contact Klaster support.`)
        return
      }
      this.txService.sendDeployTransaction(chainSelectors, salt, fee).catch(err => {
        this.errorService.showSimpleError(`A deployment error ocurred: ${err}`)
      })
    }).catch(err => {
      this.errorService.showSimpleError(`A deployment error ocurred: ${err}`)
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
    private txService: TransactionService,
    private miscModalsService: MiscModalsServiceService) { }

  ngOnInit(): void {
  }

}
