import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTargetsComponent } from './assign-targets.component';

describe('AssignTargetsComponent', () => {
  let component: AssignTargetsComponent;
  let fixture: ComponentFixture<AssignTargetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTargetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
