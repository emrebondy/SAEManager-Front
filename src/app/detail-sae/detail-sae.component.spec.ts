import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSaeComponent } from './detail-sae.component';

describe('DetailSaeComponent', () => {
  let component: DetailSaeComponent;
  let fixture: ComponentFixture<DetailSaeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSaeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
