import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantOnlineComponent } from './applicant-online.component';

describe('ApplicantOnlineComponent', () => {
  let component: ApplicantOnlineComponent;
  let fixture: ComponentFixture<ApplicantOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
