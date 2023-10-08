import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingGetAddressComponent } from './onboarding-get-address.component';

describe('OnboardingGetAddressComponent', () => {
  let component: OnboardingGetAddressComponent;
  let fixture: ComponentFixture<OnboardingGetAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingGetAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingGetAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
