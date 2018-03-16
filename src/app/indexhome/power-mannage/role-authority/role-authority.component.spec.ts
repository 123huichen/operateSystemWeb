import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAuthorityComponent } from './role-authority.component';

describe('RoleAuthorityComponent', () => {
  let component: RoleAuthorityComponent;
  let fixture: ComponentFixture<RoleAuthorityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleAuthorityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleAuthorityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
