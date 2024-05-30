import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityProfileComponent } from './entity-profile.component';

describe('EntityComponent', () => {
  let component: EntityProfileComponent;
  let fixture: ComponentFixture<EntityProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntityProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntityProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
