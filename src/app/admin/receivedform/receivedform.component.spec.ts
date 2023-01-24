import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedformComponent } from './receivedform.component';

describe('ReceivedformComponent', () => {
  let component: ReceivedformComponent;
  let fixture: ComponentFixture<ReceivedformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
