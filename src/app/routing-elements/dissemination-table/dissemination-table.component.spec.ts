
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisseminationTableComponent } from './dissemination-table.component';

describe('DisseminationTableComponent', () => {
  let component: DisseminationTableComponent;
  let fixture: ComponentFixture<DisseminationTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DisseminationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisseminationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
