import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteHomeComponent } from './institute-home.component';

describe('InstituteHomeComponent', () => {
  let component: InstituteHomeComponent;
  let fixture: ComponentFixture<InstituteHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
