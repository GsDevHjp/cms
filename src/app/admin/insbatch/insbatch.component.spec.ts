import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsbatchComponent } from './insbatch.component';

describe('InsbatchComponent', () => {
  let component: InsbatchComponent;
  let fixture: ComponentFixture<InsbatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsbatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsbatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
