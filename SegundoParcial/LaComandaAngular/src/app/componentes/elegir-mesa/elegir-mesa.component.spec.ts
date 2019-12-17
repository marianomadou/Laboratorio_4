import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElegirMesaComponent } from './elegir-mesa.component';

describe('ElegirMesaComponent', () => {
  let component: ElegirMesaComponent;
  let fixture: ComponentFixture<ElegirMesaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElegirMesaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElegirMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
