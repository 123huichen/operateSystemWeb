import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCabinetsComponent } from './file-cabinets.component';

describe('FileCabinetsComponent', () => {
  let component: FileCabinetsComponent;
  let fixture: ComponentFixture<FileCabinetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileCabinetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCabinetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
