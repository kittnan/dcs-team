import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetEngComponent } from './bottom-sheet-eng.component';

describe('BottomSheetEngComponent', () => {
  let component: BottomSheetEngComponent;
  let fixture: ComponentFixture<BottomSheetEngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottomSheetEngComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetEngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
