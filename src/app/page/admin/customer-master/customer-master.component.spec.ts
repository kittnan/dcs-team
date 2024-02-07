import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMasterComponent } from './customer-master.component';

describe('CustomerMasterComponent', () => {
  let component: CustomerMasterComponent;
  let fixture: ComponentFixture<CustomerMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerMasterComponent]
    });
    fixture = TestBed.createComponent(CustomerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
