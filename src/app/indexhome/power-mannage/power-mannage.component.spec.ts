import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerMannageComponent } from './power-mannage.component';

describe('PowerMannageComponent', () => {
  let component: PowerMannageComponent;
  let fixture: ComponentFixture<PowerMannageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerMannageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerMannageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
