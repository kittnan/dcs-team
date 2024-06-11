import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectPicComponent } from './dialog-select-pic.component';

describe('DialogSelectPicComponent', () => {
  let component: DialogSelectPicComponent;
  let fixture: ComponentFixture<DialogSelectPicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectPicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSelectPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
