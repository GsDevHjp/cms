import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsCourseComponent } from './ins-course.component';

describe('InsCourseComponent', () => {
  let component: InsCourseComponent;
  let fixture: ComponentFixture<InsCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
