import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanAmountAddedComponent } from './loan-amount-added.component';

describe('LoanAmountAddedComponent', () => {
  let component: LoanAmountAddedComponent;
  let fixture: ComponentFixture<LoanAmountAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanAmountAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanAmountAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
