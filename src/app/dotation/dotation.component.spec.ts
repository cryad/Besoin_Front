import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotationComponent } from './dotation.component';

describe('DotationComponent', () => {
  let component: DotationComponent;
  let fixture: ComponentFixture<DotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DotationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
