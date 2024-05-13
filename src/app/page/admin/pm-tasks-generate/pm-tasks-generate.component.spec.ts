import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmTasksGenerateComponent } from './pm-tasks-generate.component';

describe('PmTasksGenerateComponent', () => {
  let component: PmTasksGenerateComponent;
  let fixture: ComponentFixture<PmTasksGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmTasksGenerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmTasksGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
