import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanTypeManagementComponent } from './loan-type-management.component';

describe('LoanTypeManagementComponent', () => {
  let component: LoanTypeManagementComponent;
  let fixture: ComponentFixture<LoanTypeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanTypeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
