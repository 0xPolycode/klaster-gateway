import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContractType } from './onboarding-select-type/onboarding-select-type.component';
import { WALLETS_STORED_KEY } from '../shared/constants';
import { SessionStore } from '../shared/session.store';
import { SessionService } from '../shared/storage/session.service';
import { BlockchainService } from '../shared/blockchain/blockchain.service';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  private activeStepSub = new BehaviorSubject<{ value: number }>({value: 0})
  activeStep$ = this.activeStepSub.asObservable()

  private addressSub = new BehaviorSubject<null | string>(null)
  
  privateContractTypeSub = new BehaviorSubject<ContractType | null>(null)
  
  constructor(private sessionService: SessionService, 
    private blockchainService: BlockchainService) { }

  setAddress(address: string) {
    this.addressSub.next(address)
  }

  setContractType(type: ContractType) {
    this.privateContractTypeSub.next(type)
  }

  getPastedAddress() {
    return this.addressSub.value
  }

  advanceActiveStep() {
    this.activeStepSub.next({ value: this.activeStepSub.value.value + 1 })
  }

  revertActiveStep() {
    this.activeStepSub.next({ value: this.activeStepSub.value.value - 1 })
  }

  finishOnboarding() {
  }

}

