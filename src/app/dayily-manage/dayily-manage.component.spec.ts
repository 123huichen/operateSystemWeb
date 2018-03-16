import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayilyManageComponent } from './dayily-manage.component';

describe('DayilyManageComponent', () => {
  let component: DayilyManageComponent;
  let fixture: ComponentFixture<DayilyManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayilyManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayilyManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
