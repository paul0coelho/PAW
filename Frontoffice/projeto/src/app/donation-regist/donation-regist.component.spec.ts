import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationRegistComponent } from './donation-regist.component';

describe('DonationRegistComponent', () => {
  let component: DonationRegistComponent;
  let fixture: ComponentFixture<DonationRegistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonationRegistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonationRegistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
