import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatorProfileComponent } from './donator-profile.component';

describe('DonatorProfileComponent', () => {
  let component: DonatorProfileComponent;
  let fixture: ComponentFixture<DonatorProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonatorProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonatorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
