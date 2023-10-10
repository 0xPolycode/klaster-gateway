import { Component, OnInit } from '@angular/core';
import { OnboardingService } from '../onboarding.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  disclaimerCheckbox = new FormControl(false, [Validators.requiredTrue])

  constructor(private onboardingService: OnboardingService) { }

  ngOnInit(): void {
  }

  continueClicked() {
    this.onboardingService.advanceActiveStep()
  }

}
