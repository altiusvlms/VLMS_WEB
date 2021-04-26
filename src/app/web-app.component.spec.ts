import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { WebAppComponent } from './web-app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [WebAppComponent],
      providers: []
    });
    TestBed.compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(WebAppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
