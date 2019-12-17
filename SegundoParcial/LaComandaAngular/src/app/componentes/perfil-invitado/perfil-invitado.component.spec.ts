import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilInvitadoComponent } from './perfil-invitado.component';

describe('PerfilInvitadoComponent', () => {
  let component: PerfilInvitadoComponent;
  let fixture: ComponentFixture<PerfilInvitadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilInvitadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilInvitadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
