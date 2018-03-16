import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelAlterComponent } from './del-alter.component';

describe('DelAlterComponent', () => {
  let component: DelAlterComponent;
  let fixture: ComponentFixture<DelAlterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelAlterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelAlterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
