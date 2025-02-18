import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaeComponent } from './sae.component';

describe('SaeComponent', () => {
  let component: SaeComponent;
  let fixture: ComponentFixture<SaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
