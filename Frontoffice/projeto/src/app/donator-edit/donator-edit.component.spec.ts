import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatorEditComponent } from './donator-edit.component';

describe('DonatorEditComponent', () => {
  let component: DonatorEditComponent;
  let fixture: ComponentFixture<DonatorEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonatorEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonatorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
