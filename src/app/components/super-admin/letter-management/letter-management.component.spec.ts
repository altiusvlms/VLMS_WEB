import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterManagementComponent } from './letter-management.component';

describe('LetterManagementComponent', () => {
  let component: LetterManagementComponent;
  let fixture: ComponentFixture<LetterManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
