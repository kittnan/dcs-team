import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineerLibrarySearchComponent } from './engineer-library-search.component';

describe('EngineerLibrarySearchComponent', () => {
  let component: EngineerLibrarySearchComponent;
  let fixture: ComponentFixture<EngineerLibrarySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EngineerLibrarySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EngineerLibrarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
