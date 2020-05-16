
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDashboardComponent } from './post-dashboard.component';

describe('PostDashboardComponent', () => {
  let component: PostDashboardComponent;
  let fixture: ComponentFixture<PostDashboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
