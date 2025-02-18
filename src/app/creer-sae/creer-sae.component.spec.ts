import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerSAEComponent } from './creer-sae.component';

describe('CreerSAEComponent', () => {
  let component: CreerSAEComponent;
  let fixture: ComponentFixture<CreerSAEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerSAEComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerSAEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
