import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatorDonationsComponent } from './donator-donations.component';

describe('DonatorDonationsComponent', () => {
  let component: DonatorDonationsComponent;
  let fixture: ComponentFixture<DonatorDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonatorDonationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonatorDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
