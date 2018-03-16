import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSupervisionComponent } from './project-supervision.component';

describe('ProjectSupervisionComponent', () => {
  let component: ProjectSupervisionComponent;
  let fixture: ComponentFixture<ProjectSupervisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSupervisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
