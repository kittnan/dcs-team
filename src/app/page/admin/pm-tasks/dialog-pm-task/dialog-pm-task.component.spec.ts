import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPmTaskComponent } from './dialog-pm-task.component';

describe('DialogPmTaskComponent', () => {
  let component: DialogPmTaskComponent;
  let fixture: ComponentFixture<DialogPmTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPmTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPmTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
