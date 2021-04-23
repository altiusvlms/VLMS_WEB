import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEnrollListComponent } from './customer-enroll-list.component';

describe('CustomerEnrollListComponent', () => {
  let component: CustomerEnrollListComponent;
  let fixture: ComponentFixture<CustomerEnrollListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerEnrollListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEnrollListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
