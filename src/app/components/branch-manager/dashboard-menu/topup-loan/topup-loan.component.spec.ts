import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupLoanComponent } from './topup-loan.component';

describe('TopupLoanComponent', () => {
  let component: TopupLoanComponent;
  let fixture: ComponentFixture<TopupLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopupLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopupLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
