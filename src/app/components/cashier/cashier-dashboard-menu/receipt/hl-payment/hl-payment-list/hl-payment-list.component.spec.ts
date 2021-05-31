import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HlPaymentListComponent } from './hl-payment-list.component';

describe('HlPaymentListComponent', () => {
  let component: HlPaymentListComponent;
  let fixture: ComponentFixture<HlPaymentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlPaymentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HlPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
