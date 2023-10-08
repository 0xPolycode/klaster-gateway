import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BlockchainService } from 'src/app/shared/blockchain/blockchain.service';
import { OnboardingService } from '../onboarding.service';

@Component({
  selector: 'app-onboarding-get-address',
  templateUrl: './onboarding-get-address.component.html',
  styleUrls: ['./onboarding-get-address.component.css']
})
export class OnboardingGetAddressComponent implements OnInit {

  addressSub = new BehaviorSubject<string | null>(null)
  address$ = this.addressSub.asObservable()

  constructor(private blockchainService: BlockchainService,
    private onboardingService: OnboardingService) { }

  ngOnInit(): void {
    this.setAddress()
  }

  async setAddress() {
    const address = await this.blockchainService.calculateAddress(
      this.onboardingService.getPastedAddress()!, '0')
    this.addressSub.next(address)
  }

}
