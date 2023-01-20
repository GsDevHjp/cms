import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReceivedComponent } from './payment-received.component';

describe('PaymentReceivedComponent', () => {
  let component: PaymentReceivedComponent;
  let fixture: ComponentFixture<PaymentReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentReceivedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
