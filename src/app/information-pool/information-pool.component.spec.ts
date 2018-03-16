import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationPoolComponent } from './information-pool.component';

describe('InformationPoolComponent', () => {
  let component: InformationPoolComponent;
  let fixture: ComponentFixture<InformationPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
