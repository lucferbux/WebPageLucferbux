
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionDashboardComponent } from './introduction-dashboard.component';

describe('IntroductionDashboardComponent', () => {
  let component: IntroductionDashboardComponent;
  let fixture: ComponentFixture<IntroductionDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroductionDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroductionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
