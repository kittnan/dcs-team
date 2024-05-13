import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmTasksComponent } from './pm-tasks.component';

describe('PmTasksComponent', () => {
  let component: PmTasksComponent;
  let fixture: ComponentFixture<PmTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
