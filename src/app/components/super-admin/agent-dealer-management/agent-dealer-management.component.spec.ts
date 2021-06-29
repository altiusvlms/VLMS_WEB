import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDealerManagementComponent } from './agent-dealer-management.component';

describe('AgentDealerManagementComponent', () => {
  let component: AgentDealerManagementComponent;
  let fixture: ComponentFixture<AgentDealerManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentDealerManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDealerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
