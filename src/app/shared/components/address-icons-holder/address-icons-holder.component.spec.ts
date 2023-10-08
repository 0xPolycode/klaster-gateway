import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressIconsHolderComponent } from './address-icons-holder.component';

describe('AddressIconsHolderComponent', () => {
  let component: AddressIconsHolderComponent;
  let fixture: ComponentFixture<AddressIconsHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressIconsHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressIconsHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
