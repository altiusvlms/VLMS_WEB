import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanValueManagementComponent } from './loan-value-management.component';

describe('LoanValueManagementComponent', () => {
  let component: LoanValueManagementComponent;
  let fixture: ComponentFixture<LoanValueManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoanValueManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanValueManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
