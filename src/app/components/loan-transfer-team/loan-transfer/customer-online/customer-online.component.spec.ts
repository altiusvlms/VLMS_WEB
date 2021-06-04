import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOnlineComponent } from './customer-online.component';

describe('CustomerOnlineComponent', () => {
  let component: CustomerOnlineComponent;
  let fixture: ComponentFixture<CustomerOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
