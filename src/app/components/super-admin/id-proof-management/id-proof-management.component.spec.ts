import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdProofManagementComponent } from './id-proof-management.component';

describe('IdProofManagementComponent', () => {
  let component: IdProofManagementComponent;
  let fixture: ComponentFixture<IdProofManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdProofManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdProofManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
