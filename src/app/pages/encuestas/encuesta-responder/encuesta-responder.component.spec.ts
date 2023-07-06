import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaResponderComponent } from './encuesta-responder.component';

describe('EncuestaResponderComponent', () => {
  let component: EncuestaResponderComponent;
  let fixture: ComponentFixture<EncuestaResponderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestaResponderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaResponderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
