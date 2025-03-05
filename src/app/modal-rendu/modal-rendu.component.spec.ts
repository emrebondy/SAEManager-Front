import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRenduComponent } from './modal-rendu.component';

describe('ModalRenduComponent', () => {
  let component: ModalRenduComponent;
  let fixture: ComponentFixture<ModalRenduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRenduComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
