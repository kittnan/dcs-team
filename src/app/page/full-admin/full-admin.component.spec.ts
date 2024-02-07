import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullAdminComponent } from './full-admin.component';

describe('FullAdminComponent', () => {
  let component: FullAdminComponent;
  let fixture: ComponentFixture<FullAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullAdminComponent]
    });
    fixture = TestBed.createComponent(FullAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
