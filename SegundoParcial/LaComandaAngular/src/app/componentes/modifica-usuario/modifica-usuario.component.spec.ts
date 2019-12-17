import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaUsuarioComponent } from './modifica-usuario.component';

describe('ModificaUsuarioComponent', () => {
  let component: ModificaUsuarioComponent;
  let fixture: ComponentFixture<ModificaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
