import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanInterestComponent } from './loan-interest.component';

describe('LoanInterestComponent', () => {
  let component: LoanInterestComponent;
  let fixture: ComponentFixture<LoanInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
