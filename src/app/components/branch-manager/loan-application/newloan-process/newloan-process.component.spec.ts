import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewloanProcessComponent } from './newloan-process.component';

describe('NewloanProcessComponent', () => {
  let component: NewloanProcessComponent;
  let fixture: ComponentFixture<NewloanProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewloanProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewloanProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
