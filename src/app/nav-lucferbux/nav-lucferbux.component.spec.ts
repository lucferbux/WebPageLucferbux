
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavLucferbuxComponent } from './nav-lucferbux.component';

describe('NavLucferbuxComponent', () => {
  let component: NavLucferbuxComponent;
  let fixture: ComponentFixture<NavLucferbuxComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavLucferbuxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavLucferbuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
