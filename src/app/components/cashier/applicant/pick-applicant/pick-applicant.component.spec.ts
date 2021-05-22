import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickApplicantComponent } from './pick-applicant.component';

describe('PickApplicantComponent', () => {
  let component: PickApplicantComponent;
  let fixture: ComponentFixture<PickApplicantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickApplicantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickApplicantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
