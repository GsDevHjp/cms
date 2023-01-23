import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsstudentComponent } from './insstudent.component';

describe('InsstudentComponent', () => {
  let component: InsstudentComponent;
  let fixture: ComponentFixture<InsstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsstudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
