import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterServiceTypeOptionEditorComponent } from './master-service-type-option-editor.component';

describe('MasterServiceTypeOptionEditorComponent', () => {
  let component: MasterServiceTypeOptionEditorComponent;
  let fixture: ComponentFixture<MasterServiceTypeOptionEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterServiceTypeOptionEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterServiceTypeOptionEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
