import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YetToReceiptComponent } from './yet-to-receipt.component';

describe('YetToReceiptComponent', () => {
  let component: YetToReceiptComponent;
  let fixture: ComponentFixture<YetToReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YetToReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YetToReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
