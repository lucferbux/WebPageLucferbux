import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentsEditComponent } from './patents-edit.component';

describe('PatentsEditComponent', () => {
  let component: PatentsEditComponent;
  let fixture: ComponentFixture<PatentsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
