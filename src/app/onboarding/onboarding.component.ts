import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OnboardingService } from './onboarding.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {

  activeStep$ = this.onboardingService.activeStep$

  constructor(private onboardingService: OnboardingService) { }

  ngOnInit(): void {
  }

  isActiveStep(currentlyActive: { value: number }, checkAgainst: number) {
    return currentlyActive.value === checkAgainst
  }

}
