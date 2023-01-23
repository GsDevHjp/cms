import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsadmissionComponent } from './insadmission.component';

describe('InsadmissionComponent', () => {
  let component: InsadmissionComponent;
  let fixture: ComponentFixture<InsadmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsadmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsadmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
