import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountAnalysisComponent } from './count-analysis.component';

describe('CountAnalysisComponent', () => {
  let component: CountAnalysisComponent;
  let fixture: ComponentFixture<CountAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
