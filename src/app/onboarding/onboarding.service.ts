import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  private activeStepSub = new BehaviorSubject<{ value: number }>({value: 0})
  activeStep$ = this.activeStepSub.asObservable()

  private addressSub = new BehaviorSubject<null | string>(null)
  
  constructor() { }

  setAddress(address: string) {
    this.addressSub.next(address)
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

}
