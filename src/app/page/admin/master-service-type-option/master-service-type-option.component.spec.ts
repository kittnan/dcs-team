import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterServiceTypeOptionComponent } from './master-service-type-option.component';

describe('MasterServiceTypeOptionComponent', () => {
  let component: MasterServiceTypeOptionComponent;
  let fixture: ComponentFixture<MasterServiceTypeOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterServiceTypeOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterServiceTypeOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
