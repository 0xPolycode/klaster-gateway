import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingPasteAddressComponent } from './onboarding-paste-address.component';

describe('OnboardingPasteAddressComponent', () => {
  let component: OnboardingPasteAddressComponent;
  let fixture: ComponentFixture<OnboardingPasteAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingPasteAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingPasteAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
