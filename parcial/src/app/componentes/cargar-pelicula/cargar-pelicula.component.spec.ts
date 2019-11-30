import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarPeliculaComponent } from './cargar-pelicula.component';

describe('CargarPeliculaComponent', () => {
  let component: CargarPeliculaComponent;
  let fixture: ComponentFixture<CargarPeliculaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarPeliculaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
