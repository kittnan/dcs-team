import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturePadOnlineComponent } from './signature-pad-online.component';

describe('SignaturePadOnlineComponent', () => {
  let component: SignaturePadOnlineComponent;
  let fixture: ComponentFixture<SignaturePadOnlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignaturePadOnlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignaturePadOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
