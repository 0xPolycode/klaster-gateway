import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSelectTypeComponent } from './onboarding-select-type.component';

describe('OnboardingSelectTypeComponent', () => {
  let component: OnboardingSelectTypeComponent;
  let fixture: ComponentFixture<OnboardingSelectTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingSelectTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardingSelectTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
