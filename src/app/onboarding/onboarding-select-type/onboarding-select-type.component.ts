import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';

@Component({
  selector: 'app-onboarding-select-type',
  templateUrl: './onboarding-select-type.component.html',
  styleUrls: ['./onboarding-select-type.component.css']
})
export class OnboardingSelectTypeComponent implements OnInit {

  constructor(private onboardingService: OnboardingService) { }

  ngOnInit(): void {
  }

  selectClicked(type: ContractType) {
    this.onboardingService.advanceActiveStep()
  }

}

type ContractType = 'SAFE' | 'DAO' | 'OTHER'