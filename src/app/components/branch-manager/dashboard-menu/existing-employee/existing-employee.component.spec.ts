import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingEmployeeComponent } from './existing-employee.component';

describe('ExistingEmployeeComponent', () => {
  let component: ExistingEmployeeComponent;
  let fixture: ComponentFixture<ExistingEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistingEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistingEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
