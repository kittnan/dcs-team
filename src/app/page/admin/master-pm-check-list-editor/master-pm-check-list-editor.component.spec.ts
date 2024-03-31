import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterPmCheckListEditorComponent } from './master-pm-check-list-editor.component';

describe('MasterPmCheckListEditorComponent', () => {
  let component: MasterPmCheckListEditorComponent;
  let fixture: ComponentFixture<MasterPmCheckListEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterPmCheckListEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterPmCheckListEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
