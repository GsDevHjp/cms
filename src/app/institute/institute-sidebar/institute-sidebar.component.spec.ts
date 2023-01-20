import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteSidebarComponent } from './institute-sidebar.component';

describe('InstituteSidebarComponent', () => {
  let component: InstituteSidebarComponent;
  let fixture: ComponentFixture<InstituteSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstituteSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
