import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaPipeComponent } from './insta-pipe.component';

describe('InstaPipeComponent', () => {
  let component: InstaPipeComponent;
  let fixture: ComponentFixture<InstaPipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstaPipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstaPipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
