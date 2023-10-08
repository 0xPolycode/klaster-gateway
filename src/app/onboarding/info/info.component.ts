import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(private onboardingService: OnboardingService) { }

  ngOnInit(): void {
  }

  continueClicked() {
    this.onboardingService.advanceActiveStep()
  }

}
