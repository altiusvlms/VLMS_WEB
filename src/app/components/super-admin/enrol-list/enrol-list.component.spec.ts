import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolListComponent } from './enrol-list.component';

describe('EnrolListComponent', () => {
  let component: EnrolListComponent;
  let fixture: ComponentFixture<EnrolListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
