
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentsTableComponent } from './patents-table.component';

describe('PatentsTableComponent', () => {
  let component: PatentsTableComponent;
  let fixture: ComponentFixture<PatentsTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatentsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
