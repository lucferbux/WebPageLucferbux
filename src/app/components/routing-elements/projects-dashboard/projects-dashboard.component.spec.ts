
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardComponent } from './projects-dashboard.component';

describe('ProjectDashboardComponent', () => {
  let component: ProjectDashboardComponent;
  let fixture: ComponentFixture<ProjectDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
