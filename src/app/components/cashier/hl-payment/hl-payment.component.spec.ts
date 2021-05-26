import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HlPaymentComponent } from './hl-payment.component';

describe('HlPaymentComponent', () => {
  let component: HlPaymentComponent;
  let fixture: ComponentFixture<HlPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HlPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
