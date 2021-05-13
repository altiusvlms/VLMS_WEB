import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashLimitComponent } from './cash-limit.component';

describe('CashLimitComponent', () => {
  let component: CashLimitComponent;
  let fixture: ComponentFixture<CashLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
