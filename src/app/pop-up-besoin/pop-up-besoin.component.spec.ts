import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpBesoinComponent } from './pop-up-besoin.component';

describe('PopUpBesoinComponent', () => {
  let component: PopUpBesoinComponent;
  let fixture: ComponentFixture<PopUpBesoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpBesoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpBesoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
