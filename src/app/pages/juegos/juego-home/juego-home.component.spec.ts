import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoHomeComponent } from './juego-home.component';

describe('JuegoHomeComponent', () => {
  let component: JuegoHomeComponent;
  let fixture: ComponentFixture<JuegoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
