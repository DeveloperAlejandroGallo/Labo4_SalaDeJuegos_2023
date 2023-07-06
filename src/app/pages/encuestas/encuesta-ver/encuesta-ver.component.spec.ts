import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaVerComponent } from './encuesta-ver.component';

describe('EncuestaVerComponent', () => {
  let component: EncuestaVerComponent;
  let fixture: ComponentFixture<EncuestaVerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncuestaVerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncuestaVerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
