import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMachineComponent } from './master-machine.component';

describe('MasterMachineComponent', () => {
  let component: MasterMachineComponent;
  let fixture: ComponentFixture<MasterMachineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasterMachineComponent]
    });
    fixture = TestBed.createComponent(MasterMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
