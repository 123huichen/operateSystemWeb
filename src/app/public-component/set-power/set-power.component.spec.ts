import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPowerComponent } from './set-power.component';

describe('SetPowerComponent', () => {
  let component: SetPowerComponent;
  let fixture: ComponentFixture<SetPowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
