import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialLibrarySearchComponent } from './special-library-search.component';

describe('SpecialLibrarySearchComponent', () => {
  let component: SpecialLibrarySearchComponent;
  let fixture: ComponentFixture<SpecialLibrarySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialLibrarySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialLibrarySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
