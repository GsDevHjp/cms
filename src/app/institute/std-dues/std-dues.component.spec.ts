import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdDuesComponent } from './std-dues.component';

describe('StdDuesComponent', () => {
  let component: StdDuesComponent;
  let fixture: ComponentFixture<StdDuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdDuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdDuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
