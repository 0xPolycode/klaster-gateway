import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-onboarding-paste-address',
  templateUrl: './onboarding-paste-address.component.html',
  styleUrls: ['./onboarding-paste-address.component.css']
})
export class OnboardingPasteAddressComponent implements OnInit {

  addressInput = new FormControl('', [Validators.required, Validators.minLength(42), Validators.maxLength(42)]) 

  constructor(private onboardingService: OnboardingService) { }

  ngOnInit(): void {
  }

  continueClicked() {
    this.onboardingService.setAddress(this.addressInput.value!)
    this.onboardingService.advanceActiveStep()
  }

  backClicked() {
    this.onboardingService.revertActiveStep()
  }

}
