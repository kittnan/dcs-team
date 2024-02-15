import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterMachineEditorComponent } from './master-machine-editor.component';

describe('MasterMachineEditorComponent', () => {
  let component: MasterMachineEditorComponent;
  let fixture: ComponentFixture<MasterMachineEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterMachineEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterMachineEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
