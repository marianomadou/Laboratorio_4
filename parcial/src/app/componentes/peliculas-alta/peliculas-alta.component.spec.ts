import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasAltaComponent } from './peliculas-alta.component';

describe('PeliculasAltaComponent', () => {
  let component: PeliculasAltaComponent;
  let fixture: ComponentFixture<PeliculasAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeliculasAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculasAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
