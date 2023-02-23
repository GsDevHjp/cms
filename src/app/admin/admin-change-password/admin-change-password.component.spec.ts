import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminChangePasswordComponent } from './admin-change-password.component';

describe('AdminChangePasswordComponent', () => {
  let component: AdminChangePasswordComponent;
  let fixture: ComponentFixture<AdminChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminChangePasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
