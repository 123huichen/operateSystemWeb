import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeManageComponent } from './type-manage.component';

describe('TypeManageComponent', () => {
  let component: TypeManageComponent;
  let fixture: ComponentFixture<TypeManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
