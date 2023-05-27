import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCollabComponent } from './pop-up-collab.component';

describe('PopUpCollabComponent', () => {
  let component: PopUpCollabComponent;
  let fixture: ComponentFixture<PopUpCollabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpCollabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpCollabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
