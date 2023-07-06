import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasapalabraComponent } from './pasapalabra.component';

describe('PasapalabraComponent', () => {
  let component: PasapalabraComponent;
  let fixture: ComponentFixture<PasapalabraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasapalabraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasapalabraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
