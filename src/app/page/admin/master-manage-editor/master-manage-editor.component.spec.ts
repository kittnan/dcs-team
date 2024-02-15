import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterManageEditorComponent } from './master-manage-editor.component';

describe('MasterManageEditorComponent', () => {
  let component: MasterManageEditorComponent;
  let fixture: ComponentFixture<MasterManageEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterManageEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterManageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
