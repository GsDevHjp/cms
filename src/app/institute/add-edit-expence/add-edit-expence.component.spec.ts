import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditExpenceComponent } from './add-edit-expence.component';

describe('AddEditExpenceComponent', () => {
  let component: AddEditExpenceComponent;
  let fixture: ComponentFixture<AddEditExpenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditExpenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditExpenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
