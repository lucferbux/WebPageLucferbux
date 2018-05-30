
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavIdeasLocasComponent } from './nav-ideas-locas.component';

describe('NavIdeasLocasComponent', () => {
  let component: NavIdeasLocasComponent;
  let fixture: ComponentFixture<NavIdeasLocasComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavIdeasLocasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavIdeasLocasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
