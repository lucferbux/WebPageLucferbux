import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisseminationPageComponent } from './dissemination-page.component';

describe('DisseminationPageComponent', () => {
  let component: DisseminationPageComponent;
  let fixture: ComponentFixture<DisseminationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisseminationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisseminationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
